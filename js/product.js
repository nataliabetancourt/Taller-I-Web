import { db } from "./app"; 
import { getSingleProduct } from "./functions/getProduct";
import { currencyFormat } from "./utils";

//Get HTML elements
const productInfo = document.getElementById("productInfo");
const productAssets = document.getElementById("productAssets");

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
        <img src="${product.images[0]}" class="product__main">`;

    //Paint information
    productInfo.innerHTML = `
        <h1 class="product__name">${product.name}</h1>
        <h2 class="product__color">${product.color.name.toUpperCase()}</h2>
        <h2 class="product__price">${currencyFormat(product.price)}</h2>
        <p class="product__description">${product.description}</p>
        <button class="product__bag">ADD TO BAG</button>
        `;

    //Paint product gallery
    const gallery = document.createElement("div");
    gallery.className = "product__gallery";

    product.images.forEach(image => {
        gallery.innerHTML += `<img src="${image}">`;
    });

    productAssets.appendChild(gallery);
}

loadProduct();