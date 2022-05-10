import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseBag, createFirebaseBag } from "./functions/bag";
import { currencyFormat, getMyLocalBag, addProductToBag } from "./utils";

const bagSection = document.getElementById("bagSection");
const totalSection = document.getElementById("totalSection");
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

    bagProduct.innerHTML = `
        <img src="${product.images[0]}" alt="">
        <h3>${product.name}</h3>
        <p>${product.color.name.toUpperCase()}</p>
        <p>${currencyFormat(product.price)}</p>
        <button>x</button>`;

    bagSection.appendChild(bagProduct);

    //Delete button
    bagProduct.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
            console.log("go");
            removeProduct(product.id);
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

    loadBag(bag);
});