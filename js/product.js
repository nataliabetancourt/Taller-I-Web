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

function renderProduct(product) {
    //Paint images
    productAssets.innerHTML = `
        <div>
        <img src="${product.images[0]}" class="product__main" id="mainImg">
        </div>`;

    //Paint information
    productInfo.innerHTML = `
        <h1 class="product__name">${product.name}</h1>
        <h2 class="product__color">${product.color.name.toUpperCase()}</h2>
        <h2 class="product__price">${currencyFormat(product.price)}</h2>
        <p class="product__description">${product.description}</p>
        <button class="product__bag">ADD TO BAG</button>`;

    if (product.images.length > 1) {
        createGallery(product.images);
    }

    //Add to bag button
    const bagBtn = document.querySelector(".product__bag");

    //Counter for number of times product is added, adding variable to items
    let counter = 0;

    bagBtn.addEventListener("click", async (e) => {
        //Adding to counter every click
        counter++;

        //If its the first time adding the product to cart, add item to array and modify counter
        if (counter == 1) {
            product['counter'] = counter;
            bag.push(product);        
        //Else, only modify counter
        } else {
            product['counter'] = counter;
        }

        //Local storage
        addProductToBag(bag);

        //If user is logged, add to firebase
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
            console.log("click");
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

console.log(bag);
