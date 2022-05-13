import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseBag } from "./functions/bag";
import { currencyFormat } from "./utils";
import { addOrder } from "./functions/checkout";

//Call html elements
const checkoutForm = document.getElementById("checkoutForm");
const orderSection = document.getElementById("checkoutOrder");
const checkoutTotal = document.getElementById("checkoutTotal");
const shippingText = document.getElementById("shippingPrice");

let bag = [];
let order = [];
let userLogged = undefined;
let shippingPrice = 0;
let total = 0;

function loadBag(bag) {
    bag.forEach(product => {
        const { name, price } = product;
        const orderProduct = {
            name,
            price
        }

        //Add products in bag to order and push to array
        order.push(orderProduct);

        //Add total of products
        total += parseInt(product.price)*product.counter;

        renderProduct(product);
        checkoutTotal.innerText = currencyFormat(total);
    });
}

function renderProduct(product) {
    const orderProduct = document.createElement("div");
    orderProduct.className = "order";

    orderProduct.innerHTML = `
        <img src="${product.images[0]}" alt="" class="order__img">
        <div class="order__infosection">
            <h3 class="order__name">${product.name}</h3>
            <p class="order__info">${product.color.name.toUpperCase()}</p>
            <p class="order__info">${currencyFormat(product.price)}</p>
        </div>`;

    orderSection.appendChild(orderProduct);
}

checkoutForm.addEventListener("change", e => {
    finalTotal = total;

    if (checkoutForm.shipping.value == "standard") {
        shippingPrice = 6;
    }

    if (checkoutForm.shipping.value == "expedited") {
        shippingPrice = 10;
    }

    if (checkoutForm.shipping.value == "overnight") {
        shippingPrice = 14;
    }

    //Final order total based on shipping
    finalTotal = total+shippingPrice;
    shippingText.innerHTML = "Shipping price: " + currencyFormat(shippingPrice);
    checkoutTotal.innerText = finalTotal;
});

checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("clicked");

    //All the checkout inputs
    const firstname = checkoutForm.firstname.value;
    const lastname = checkoutForm.lastname.value;
    const address = checkoutForm.address.value;
    const city = checkoutForm.city.value;
    const cellphone = checkoutForm.cell.value;
    const shipping = checkoutForm.shipping.value;
    const cardNum = checkoutForm.card.value;
    const expiration = checkoutForm.expiration.value;
    const code = checkoutForm.code.value;

    //Create user array
    const userInfo = {
       firstname,
       lastname,
       address,
       city, 
       cellphone 
    }

    //Create payment array
    const paymentInfo = {
        shipping, 
        cardNum,
        expiration,
        code
    }

    //Create order object
    const orderComplete = {
        userInfo,
        paymentInfo,
        order,
        finalTotal
    }

    //Add order to firestore database
    await addOrder(db, orderComplete);
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;
      bag = await getFirebaseBag(db, userLogged.uid);
    }

    loadBag(bag);
});