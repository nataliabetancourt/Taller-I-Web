import { db } from "./app"; 
import { getSingleProduct } from "./functions/getProduct";

function getParam(param) {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function loadProduct() {
    const productId = getParam("id"); // http://localhost:1234/product.html?id=TXQ9Wf1GIoAOJLkIEMYo&age=20

    //Get data from database
    const data = await getSingleProduct(productId);

    //Create object with data and id
    const product = {
        ...data,
        id: productId, // docSnap.id,
    }

    //renderProduct(product);
}

getParam("id");