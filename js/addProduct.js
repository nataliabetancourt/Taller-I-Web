//Import functions needed
import { storage, db } from './app';
import { addProduct, uploadImages } from './functions/createProduct';
import { colors } from './utils';

//Call html elements
const productForm = document.getElementById("productsForm");
const productColors = document.getElementById("color");
const colorBox = document.getElementById("colorBox");
const container = document.querySelector('.rating');
const items = container.querySelectorAll('.rating-item');

let color;
let rating = "No rating";
const counter = 0;

productForm.category.addEventListener("change", e => {
    const productCategory = productForm.category.value;

    //Get palette from category array
    const { palette } = colors.find(color => color.category === productCategory);

    //Create new array with html elements, based on color information
    const colorsOption = palette.map((color) => {
        return `<option value="${color.hex}">${color.name}</option>`
    });

    //Set select with options
    productColors.innerHTML = colorsOption;

    productColors.addEventListener("change", e => {
        colorBox.style.backgroundColor = productColors.value;
        const name = productColors.selectedOptions[0].text;
        
        console.log(productColors.value);
        //Color object to add to firebase
        color = {
            name: name,
            hex: productColors.value
        }; 
    });
});

container.addEventListener("click", e => {
    const elClass = e.target.classList;
    // change the rating if the user clicks on a different star
    if (!elClass.contains('active')) {
         // reset the active class on the star
        items.forEach(item => item.classList.remove('active'));

        //add active class to the clicked star
        rating = e.target.getAttribute("data-rate");
        elClass.add('active'); 
    }
});

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

        //Add to array
        imageGallery = await Promise.all(imagesUploaded);
    }

    //Create product object
    const newProduct = {
        name, 
        category, 
        price, 
        description, 
        stock, 
        color,
        rating,
        images: imageGallery,
        counter
    }

    //Add product to firestore database
    await addProduct(db, newProduct);
    productForm.reset();
});