const slider = document.getElementById("shadeSlider");
const foundation = document.getElementById("foundation");
const model = document.getElementById("model");
const signOutBtn = document.getElementById("signOutBtn");
const profileBtn = document.getElementById("profileBtn");

slider.addEventListener("change", e =>{

    const sliderValue = slider.value;

    if (sliderValue >= 0 && sliderValue < 12) {
        foundation.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Ffoundation1.jpg?alt=media&token=63c07c7b-6017-4415-b779-2e6bd5905e37';
        model.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Fmodel1.jpg?alt=media&token=19bf4fff-140f-4e35-9387-064e31c279a7';
    }

    if (sliderValue >= 12 && sliderValue < 26) {
        foundation.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Ffoundation2.jpg?alt=media&token=d23fd92c-9690-425d-9727-8270eb920bb3';
        model.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Fmodel2.jpg?alt=media&token=f5538f8d-39d4-4948-8e0e-71e2ad822c5e  ';
    }

    if (sliderValue >= 26 && sliderValue < 40) {
        foundation.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Ffoundation3.jpg?alt=media&token=8a1f7adb-53c8-4f88-a4f3-34965f5aa36f';
        model.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Fmodel3.jpg?alt=media&token=1ce8fbdc-98db-4f31-a141-8d65550f8077';
    }

    if (sliderValue >= 40 && sliderValue < 54) {
        foundation.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Ffoundation4.jpg?alt=media&token=94613d6b-b8b5-4927-bddd-faf3a361b110';
        model.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Fmodel4.jpg?alt=media&token=69000f24-0e04-4de0-bcff-5d97d51d3c9a';
    }

    if (sliderValue >= 54 && sliderValue < 70) {
        foundation.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Ffoundation5.jpg?alt=media&token=332e20e6-eeac-4c82-a20e-3a567cff2380';
        model.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Fmodel5.jpg?alt=media&token=b0abe676-d3f1-45de-8f5a-1db9ea4e2587';
    }

    if (sliderValue >= 70 && sliderValue < 85) {
        foundation.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Ffoundation6.jpg?alt=media&token=5333ff98-3d30-409c-9955-41a467d99301';
        model.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Fmodel6.jpg?alt=media&token=2a37a49d-3b21-44b1-a153-68d2dfeb1ac1';
    }

    if (sliderValue >= 85 && sliderValue < 101) {
        foundation.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Ffoundation7.jpg?alt=media&token=14007330-36b0-4dd4-80ae-78ade608ca19';
        model.src = 'https://firebasestorage.googleapis.com/v0/b/web-charlotte-shop.appspot.com/o/images%2Fmodel7.jpg?alt=media&token=cb9543c2-5411-4b97-a11d-026e862e4178';
    }

});