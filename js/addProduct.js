//Import functions needed
import { storage, db } from './app';
import { addProduct, uploadImages } from './functions/createProduct';

//Call html elements
const productForm = document.getElementById("productsForm");
const productColors = document.getElementById("color");
const colorBox = document.getElementById("colorBox");

let color;

const colors = [
    {
        category: "face",
        palette: [
            {
                name: "None",
                hex: "#ffffff"
            },
            {
                name: "1 Cool",
                hex: "#f4cfb5"
            },
            {
                name: "4 Warm",
                hex: "#ecbd8f"
            },
            {
                name: "7 Neutral",
                hex: "#cd9369"
            },
            {
                name: "9 Cool",
                hex: "#ca864f"
            },
            {
                name: "12.5 Warm",
                hex: "#ac6c40"
            },
            {
                name: "15 Neutral",
                hex: "#754626"
            },
        ],
    },
    {
        category: "cheek",
        palette: [
            {
                name: "Romance light",
                hex: "#c4867c"
            },
            {
                name: "Medium bronze",
                hex: "#ca906a"
            },
            {
                name: "Tan bronze",
                hex: "#bc7a51"
            },
            {
                name: "Peachgasm",
                hex: "#f58e7e"
            },
            {
                name: "Pinkgasm",
                hex: "#ed7d7e"
            }
        ],
    },
    {
        category: "eyes",
        palette: [
            {
                name: "Super Black",
                hex: "#090909"
            },
            {
                name: "Pillow Talk",
                hex: "#dd8d8a"
            },
            {
                name: "Pillow Talk Dreams",
                hex: "#82362b"
            },
            {
                name: "The Sophisticate",
                hex: "#ba8973"
            },
            {
                name: "Copper Charge",
                hex: "#c26f59"
            }
        ],
    },
    {
        category: "lips",
        palette: [
            {
                name: "Scarlet Spell",
                hex: "#8b2833"
            },
            {
                name: "Pillow Talk",
                hex: "#dc7b77"
            },
            {
                name: "Lost Cherry",
                hex: "#fd5d5f"
            },
            {
                name: "Love Liberty",
                hex: "#aa2937"
            },
            {
                name: "Gold",
                hex: "#dc7e53"
            }
        ],
    }
];

productForm.category.addEventListener("change", e => {
    const productCategory = productForm.category.value;

    //Get palette from category array
    const { palette } = colors.find(color => color.category === productCategory);
    console.log(palette);

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
        images: imageGallery,
    }

    //Add product to firestore database
    await addProduct(db, newProduct);
    productForm.reset();
});