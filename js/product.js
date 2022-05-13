import { db, auth } from "./app"; 
import { onAuthStateChanged } from "firebase/auth";
import { getSingleProduct } from "./functions/getProduct";
import { addProductToBag, currencyFormat, getMyLocalBag } from "./utils";
import { getFirebaseBag } from "./functions/bag";   

//Get HTML elements
const productInfo = document.getElementById("productInfo");
const productAssets = document.getElementById("productAssets");

let userLogged = undefined;
let bag = [];

function getParam(param) {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function loadProduct() {
    const productId = getParam("id"); // http://localhost:1234/product.html?id=TXQ9Wf1GIoAOJLkIEMYo&age=20

    //Get data from database
    const data = await getSingleProduct(db, productId);

    //Create object with data and id
    const product = {
        ...data,
        id: productId, // docSnap.id,
    }

    //Render product - product page layout
    renderProduct(product);
}

function showRatings(rating) {
    //Check if rating is 5
    if (rating > 4) {
        stars = "https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2F5star.png?alt=media&token=0e7dfd68-9a75-44a2-b477-f2cce7fc328e";
    } else if(rating > 3) {
        stars = "https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2F4star.png?alt=media&token=f49f353d-a4c2-4bbb-b52f-bf7c3b8ad795";
    } else if (rating > 2) {
        stars = "https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2F3star.png?alt=media&token=bfe458d0-3bd8-48b1-a5c8-f4bc64198184";
    } else if (rating > 1) {
        stars = "https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2F2star.png?alt=media&token=b0ed27fc-5c7b-4c16-9a49-fbd26011c043";
    } else if (rating > 0) {
        stars = "https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2F1star.png?alt=media&token=bcb5f492-8e45-4e5a-b739-502407478091";
    }
}

function renderProduct(product) {
    //Paint images
    productAssets.innerHTML = `
        <div>
        <img src="${product.images[0]}" class="product__main" id="mainImg">
        </div>`;

    //Get rating image for each product
    showRatings(product.rating);

    //Paint information
    productInfo.innerHTML = `
        <h1 class="product__name">${product.name}</h1>
        <h2 class="product__color">${product.color.name.toUpperCase()}</h2>
        <h2 class="product__price">${currencyFormat(product.price)}</h2>
        <p class="product__description">${product.description}</p>
        <img src="${stars}" class="product__rating">
        <button class="product__bag">ADD TO BAG</button>`;

    if (product.images.length > 1) {
        createGallery(product.images);
    }

    //Add to bag button
    const bagBtn = document.querySelector(".product__bag");

    //Counter for number of times product is added, adding variable to items
    let counter = 0;

    bagBtn.addEventListener("click", async (e) => {
        const currentProductIsAdded = bag.find(product => product.id === item.id);

        const productToAdd = {
            ...item,
            counter: (currentProductIsAdded) ? currentProductIsAdded.counter + 1 : 1,
        }

        if (currentProductIsAdded) {
            const indexElement = bag.findIndex(product => product.id === item.id);
            bag[indexElement] = productToAdd;
        } else {
            bag.push(productToAdd);
        }
 
        addProductToBag(bag);

        if (userLogged) {
            await createFirebaseBag(db, userLogged.uid, bag);
        }
    });

}

function createGallery(images) {
    //Paint product gallery
    const gallery = document.createElement("div");
    gallery.className = "product__gallery";

    images.forEach(image => {
        gallery.innerHTML += `<div><img src="${image}"></div>`;
    });

    productAssets.appendChild(gallery);

    //Switch main img  
    const mainImage = document.getElementById("mainImg");
    const galleryImgs = document.querySelector(".product__gallery");

    galleryImgs.addEventListener("click", e => {
        if (e.target.tagName === "IMG") {
            mainImage.setAttribute("src", e.target.currentSrc);

        }
    });
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;
      bag = await getFirebaseBag(db, userLogged.uid);

    } else {
        bag = getMyLocalBag();
    }

    loadProduct();
});

