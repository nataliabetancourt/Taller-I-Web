//Calling html elements
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imgInput = document.getElementById("image");
const stockInput = document.getElementById("stock");
const colorInput = document.getElementById("color");
const addBtn = document.getElementById("form");
const products = document.getElementById("products");

//Product array
const productsCreated = [];


//To render shop products
function renderProducts(){
    //Leave div empty to fill
    products.innerHTML = "";
    productsCreated.forEach(product => {
        products.appendChild(render(product));
    });
}

//Create items
function render(product){
         //Container
         const item = document.createElement("div");
         const inStock = product.stock > 0 ? "IN STOCK" : "NOT IN STOCK"
         item.className = "shop__item";
         item.innerHTML = `
            <img class="shop__img" src="${product.image}">
            <h3 class="shop__product serif">${product.name}</h3>
            <h5 class="sans">${"$" + product.price}</h5>
            <p class="sans">${inStock}</p>
            <p class="sans">${"Color: " + product.color}</p>
         `;
         return item;
}

//Create product object and add to array when clicking sumbit
addBtn.addEventListener('submit', e => {
    e.preventDefault();

    if (nameInput.value === "" || priceInput.value == "" || imgInput.value === "" || stockInput.value == "" || colorInput.value === "") {
        alert("Fill in the spaces");
    } else {
        const product = {
            name: nameInput.value,
            price: "" + priceInput.value,
            image: imgInput.value, 
            stock: stockInput.value,
            color: colorInput.value
        }
        productsCreated.push(product);
        console.log(productsCreated);
        renderProducts();

        //Leave inputs empty
        nameInput.value = "";
        priceInput.value = "";
        imgInput.value = "";
        stockInput.value = "";
        colorInput.value = "";
    }
});

