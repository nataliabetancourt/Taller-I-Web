//Creating the user thats going to buy
const user = {
    name: "Sofia Romero", 
    email: "sofiarom@gmail.com",
    gender: "Female",
    age: "21",
    birthDate: 12/12/2000
}

//Creating the product list
const products = [
    {
        name: "THE FAMOUS AIRBRUSH FLAWLESS ROUTINE FACE KIT",
        price: 118,
        image: '../images/face_kit.png',
        amount: 10,
        color: "Beige",
    },
    {
        name: "SCIENCE-POWERED MAGIC CREAM LIGHT & SERUM KIT",
        price: 154,
        image: '../images/serum_kit.png',
        amount: 20,
        color: "Standard",
    },
    {
        name: "PILLOW TALK LIP KIT",
        price: 48,
        image: '../images/serum_kit.png',
        amount: 15,
        color: "Pillow Talk",
    }, 
    {
        name: "AIRBRUSH BRONZER",
        price: 50,
        image: '../images/bronzer.png',
        amount: 0,
        color: "Dark Carmel",
    },
    {
        name: "MATTE REVOLUTION",
        price: 32,
        image: '../images/matte_lipstick.png',
        amount: 0,
        color: "Pillow Talk Original",
    },
    {
        name: "THE HOLLYWOOD CONTOUR DUO",
        price: 62,
        image: '../images/hollywood_duo.png',
        amount: 8,
        color: "Classic",
    },
    {
        name: "AIRBRUSH FLAWLESS FOUNDATION",
        price: 40,
        image: '../images/foundation1.jpg',
        amount: 4,
        color: "Cool",
    },
    {
        name: "PILLOW TALK PUSH UP LASHES! MASCARA",
        price: 29,
        image: '../images/mascara.png',
        amount: 0,
        color: "Black",
    },
    {
        name: "LUXURY PALETTE",
        price: 50,
        image: '../images/eyeshadow.png',
        amount: 30,
        color: "Walk of No Shame",
    },
    {
        name: "MAGIC AWAY",
        price: 29,
        image: '../images/concealer.png',
        amount: 0,
        color: "Deep",
    }
]

//HTML element for rendering
const shopSection = document.getElementById("shop");

function filter() {
    //Filter products for prices over 50 or if they're available in stock
    console.log("The products that cost more than 50$ or that are in stock are: ");
    products.forEach(product => {
        if (product.price > 50 || product.amount > 0) {
            console.log(product.name);
        }
    });
}

//To render shop products
function shopProducts(){
    //Leave div empty to fill
    shopSection.innerHTML = "";
    products.forEach(product => {
        shopSection.appendChild(render(product));
    });
}

//Create items
function render(product){
         //Container
         const item = document.createElement("div");
         const inStock = product.amount > 0 ? "IN STOCK" : "NOT IN STOCK"
         item.className = "shop__item";
         item.innerHTML = `
            <img class="shop__img" src="${product.image}">
            <h3 class="shop__product serif">${product.name}</h3>
            <h5 class="shop__price sans">${"$" +product.price}</h5>
            <p class="shop__price sans">${inStock}</p>
         `;

         return item;
}

filter();
shopProducts();