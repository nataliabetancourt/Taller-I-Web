//Import necessary functions
import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { createFirebaseBag, getFirebaseBag } from "./functions/bag";
import { getAllProducts } from "./functions/getProduct";
import { addProductToBag, getMyLocalBag, currencyFormat } from "./utils";

//Get HTML elements
const productSection = document.getElementById("productSection");
const categoryFilter = document.getElementById("category");
const orderFilter = document.getElementById("price");

let products = [];
let bag = [];
let userLogged = undefined;

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
    const coverImg = item.images.length ? item.images[0] : "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640";

    //Create product box
    product.innerHTML = `
        <img src="${coverImg}" alt="${item.name}" class="product__img">
        <h2 class="product__name">${item.name}</h2>
        <h3 class="product__price">${currencyFormat(item.price)}</h3>
        <button class="product__bag">ADD TO BAG</button>`;

    productSection.appendChild(product);

    //Add to bag button
    const addToBagBtn = product.querySelector(".product__bag");

    //Counter for number of times product is added, adding variable to items
    let counter = 0;
    item.counter = counter;

    addToBagBtn.addEventListener("click", async (e) => {
        e.preventDefault(); //Avoid allowing the link to change screens

        //Adding to counter every click
        counter++;

        //If its the first time adding the product to cart, add item to array and modify counter
        if (counter == 1) {
            item['counter'] = counter;
            bag.push(item);        
        //Else, only modify counter
        } else {
            item['counter'] = counter;
        }

        addProductToBag(bag);

        if (userLogged) {
            await createFirebaseBag(db, userLogged.uid, bag);
        }
    });
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
