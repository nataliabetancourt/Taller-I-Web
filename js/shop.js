//Import necessary functions
import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { createFirebaseBag, getFirebaseBag } from "./functions/bag";
import { getAllProducts } from "./functions/getProduct";
import { addProductToBag, getMyLocalBag, currencyFormat, colors } from "./utils";

//Get HTML elements
const productSection = document.getElementById("productSection");
const categoryFilter = document.getElementById("category");
const stockFilter = document.getElementById("stock");
const colorFilter = document.getElementById("color");
const orderPriceFilter = document.getElementById("price");
const orderRatingsFilter = document.getElementById("rating");
const orderNameFilter = document.getElementById("name");

let products = [];
let bag = [];
let filteredProducts = [];
let userLogged = undefined;
let stars = undefined;

async function loadProducts() {
    //Get products from database
    const firebaseProducts = await getAllProducts(db);
    productSection.innerHTML = "";
    //Go through product array and render each product
    firebaseProducts.forEach(product => {
        renderProduct(product);
    });

    products = firebaseProducts;
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

function renderProduct(item) {
    const product = document.createElement("a");
    product.className = "product";

    //Get rating image for each product
    showRatings(item.rating);
    
    //Set link for each product
    product.setAttribute("href", `./product.html?id=${item.id}`);

    //Check for images, if there are no images, use placeholder
    const coverImg = item.images.length ? item.images[0] : "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640";

    //Create product box
    product.innerHTML = `
        <img src="${coverImg}" alt="${item.name}" class="product__img">
        <div>
            <h2 class="product__name">${item.name}</h2>
            <h3 class="product__color">${item.color.name.toUpperCase()}</h3>
            <div class="product__bottom">
                <h3 class="product__price">${currencyFormat(item.price)}</h3>
                <img src="${stars}" class="product__rating">
            </div>
            <button class="product__bag">ADD TO BAG</button>
        </div>`;

    productSection.appendChild(product);

    //Add to bag button
    const addToBagBtn = product.querySelector(".product__bag");

    addToBagBtn.addEventListener("click", async (e) => {
        e.preventDefault(); //Avoid allowing the link to change screens

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

//Set color filter with options
function colorSelector() {
    const productCategory = categoryFilter.value;

    //Get palette from category array
    const { palette } = colors.find(color => color.category === productCategory);

    //Create new array with html elements, based on color information
    const colorsOption = palette.map((color) => {
        return `<option value="${color.hex}">${color.name}</option>`
    });

    //Set select with options
    colorFilter.innerHTML = colorsOption;
}

function renderArray(array) {
    //Paint new array of products based on filter
    productSection.innerHTML = "";
    array.forEach(product => {
        renderProduct(product);
    });
}
 
//Filter by category
function filterBy() {
    const newCategory = categoryFilter.value;
    const newStock = stockFilter.value;

    const newPriceOrder = orderPriceFilter.value;
    const newRatingsOrder = orderRatingsFilter.value;
    const newAlphaOrder = orderNameFilter.value;

    //Check if selected category option has a value
    if (newCategory !== "") {
        //Filter for category
        filteredProducts = products.filter((product) => product.category === newCategory);

    } else {
        filteredProducts = products;
    }

    //Check if selected stock option has a value
    if (newStock === "Stock") {
        filteredProducts = products.filter((product) => product.stock > 0);
    } if (newStock === "None") {
        filteredProducts = products.filter((product) => product.stock <= 0);
    } 

    //Check if price is going up or down 
    if (newPriceOrder == "up") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } 

    if (newPriceOrder == "down") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } 

    //Check if ratings are going up or down 
    if (newRatingsOrder == "up") {
        filteredProducts = filteredProducts.sort((a, b) => a.rating - b.rating);
    } 

    if (newRatingsOrder == "down") {
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
    } 

    //Check what order the user wishes for (a to z, z to a)
    if (newAlphaOrder == "down") {
        filteredProducts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    if (newAlphaOrder == "up") {
        filteredProducts.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    }

    renderArray(filteredProducts);
}

categoryFilter.addEventListener("change", e => {
    filterBy();

    //Show colors based on category
    colorSelector();
});

stockFilter.addEventListener("change", e => {
    filterBy();
});

colorFilter.addEventListener("change", e => {
    filteredProducts = products.filter((product) => product.color.hex === colorFilter.value);
    renderArray(filteredProducts);
});

orderPriceFilter.addEventListener("change", e => {
    filterBy();
});

orderRatingsFilter.addEventListener("change", e => {
    filterBy();
});

orderNameFilter.addEventListener("change", e => {
    filterBy();
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;
      bag = await getFirebaseBag(db, userLogged.uid);
    } else {
        bag = getMyLocalBag();
    }

    loadProducts();
});

