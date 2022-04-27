//Import functions needed
import { storage, db } from './app';
import { addProduct, uploadImages } from './functions/createProduct';

//Call html elements
const productForm = document.getElementById("productsForm");

productForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    console.log("clicked");

    //All the product object variables
    const name = productForm.name.value;
    const category = productForm.category.value;
    const price = productForm.price.value;
    const description = productForm.description.value;
    const stock = productForm.stock.value;
    const images = productForm.images.files;

    let imageGallery = []; 

    //Check if images is empty, if not, upload images to firebase storage
    if (images.length) {
        //Upload to firestore
        const imagesUploaded = await uploadImages(storage, [...images]);
        //console.log(imagesUploaded);

        //Add to array
        //imageGallery = await Promise.all(imagesUploaded);
    }

    //Create product object
    const newProduct = {
        name, 
        category, 
        price, 
        description, 
        stock, 
        images: imageGallery,
    }

    //Add product to firestore database
    await addProduct(db, newProduct);
});