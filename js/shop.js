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
const orderNameFilter = document.getElementById("name");

let products = [];
let bag = [];
let userLogged = undefined;

//Start empty array for product colors 
filteredColor = [];

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
        <h3 class="product__color">${item.color.name.toUpperCase()}</h3>
        <h3 class="product__price">${currencyFormat(item.price)}</h3>
        <button class="product__bag">ADD TO BAG</button>`;

    productSection.appendChild(product);

    //Add to bag button
    const addToBagBtn = product.querySelector(".product__bag");

    //Counter for number of times product is added, adding variable to items
    let counter = 0;

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
    const newAlphaOrder = orderNameFilter.value;

    let filteredProducts = [];

    //Check if selected category option has a value
    if (newCategory !== "") {
        //Filter for category
        filteredProducts = products.filter((product) => product.category === newCategory);

        //Filter for color
        filteredProducts = products.filter((product) => product.color.hex === colorFilter.value);
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
    filterBy();
});

orderPriceFilter.addEventListener("change", e => {
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

