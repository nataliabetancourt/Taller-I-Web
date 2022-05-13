import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseBag, createFirebaseBag, changeCounter } from "./functions/bag";
import { currencyFormat, getMyLocalBag, addProductToBag } from "./utils";

//Get HTML elements
const bagSection = document.getElementById("bagSection");
const totalSection = document.getElementById("totalSection");
const checkoutBtn = document.getElementById("checkoutBtn");

let bag = [];
let userLogged = undefined;

function loadBag(bag) {
    let total = 0;
    bag.forEach(product => {
        renderProduct(product);
        total += parseInt(product.price)*product.counter;
    });

    totalSection.innerText = currencyFormat(total);
}

async function removeProduct(productId) {
    const newBag = bag.filter(product => product.id !== productId);
    bag = newBag;

    if (userLogged) {
        await createFirebaseBag(db, userLogged.uid, newBag);
    }

    addProductToBag(newBag);
    bagSection.innerHTML = "";
    loadBag(newBag);
}

function renderProduct(product) {
    const bagProduct = document.createElement("li");
    bagProduct.className = "bag__container";

    bagProduct.innerHTML = `
        <img src="${product.images[0]}" alt="" class="bag__image">
        <div class="bag__infosection">
            <h3 class="bag__name">${product.name}</h3>
            <p class="bag__info">${product.color.name.toUpperCase()}</p>
            <p class="bag__info">${currencyFormat(product.price)}</p>
            <button class="bag__btn" id="delete">x</button>
            <p class="bag__info">Quantity: ${product.counter}</p>
        </div>`;

    bagSection.appendChild(bagProduct);

    //Delete button
    bagProduct.addEventListener("click", e => {
        console.log(e.target.id);
        //Delete product
        if (e.target.id === "delete") {
            console.log("go");
            removeProduct(product.id);
        }
    }); 
}

checkoutBtn.addEventListener("click", e => {
    e.preventDefault();
    
    //Check if a user is logged before switching pages
    if (userLogged == undefined) {
        alert("Login to continue to checkout");
    } else {
        //If logged in, go to checkout
        window.location.href = "./checkout.html";
    }
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

    loadBag(bag);
});