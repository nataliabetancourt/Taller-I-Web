//Calling html elements
const form = document.getElementById("form");
//Element to paint products
const products = document.getElementById("products");
//Product array
const productsCreated = [];
//To render shop products
function renderProducts() {
    //Leave div empty to fill
    products.innerHTML = "";
    productsCreated.forEach((product)=>{
        products.appendChild(render(product));
    });
}
//Create items
function render(product) {
    //Container
    const item = document.createElement("div");
    const inStock = product.stock > 0 ? "IN STOCK" : "NOT IN STOCK";
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
addBtn.addEventListener('submit', (e)=>{
    e.preventDefault();
    if (form.name.value === "" || form.price.value == "" || form.image.value === "" || form.stock.value == "" || form.color.value === "") alert("Fill in the spaces");
    else {
        const product = {
            name: form.name.value,
            price: "" + form.price.value,
            image: form.image.value,
            stock: form.stock.value,
            color: form.color.value
        };
        productsCreated.push(product);
        console.log(productsCreated);
        renderProducts();
        //Leave inputs empty
        form.name.value = "";
        form.price.value = "";
        form.image.value = "";
        form.stock.value = "";
        form.color.value = "";
    }
});

//# sourceMappingURL=addproduct.084c3fa9.js.map
