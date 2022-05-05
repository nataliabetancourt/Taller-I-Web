//Import necessary functions
import { db } from "./app";
import { getAllProducts } from "./functions/getProduct";
import { currencyFormat } from "./utils";

//Get HTML elements
const productSection = document.getElementById("productSection");
const categoryFilter = document.getElementById("category");
const orderFilter = document.getElementById("price");

let products = [];

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

function renderProduct(item) {
    const product = document.createElement("a");
    product.className = "product";

    //Set link for each product
    product.setAttribute("href", `./product.html?id=${item.id}`);

    //Check for images, if there are no images, use placeholder
    const coverImg = item.images ? item.images[0] : "../images/placeholder.jpg";

    //Create product box
    product.innerHTML = `
        <img src="${coverImg}" alt="${item.name}" class="product__img">
        <h2 class="product__name">${item.name}</h2>
        <h3 class="product__price">${currencyFormat(item.price)}</h3>
        <button class="product__bag">ADD TO BAG</button>`;

    productSection.appendChild(product);
}

//Filter by category
function filterBy() {
    const newCategory = categoryFilter.value;
    const newOrder = orderFilter.value;

    let filteredProducts = [];

    //Check if selected option has a value
    if (newCategory !== "") {
        filteredProducts = products.filter((product) => product.category === newCategory);
    } else {
        filteredProducts = products;
    }

    //Check if price is going up or down 
    if (newOrder == "up") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } 

    if (newOrder == "down") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } 
    
    //Paint new array of products based on filter
    productSection.innerHTML = "";
    filteredProducts.forEach(product => {
        renderProduct(product);
    })

}

categoryFilter.addEventListener("change", e => {
    filterBy();
});

orderFilter.addEventListener("change", e => {
    filterBy();
})

loadProducts(); 