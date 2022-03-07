const slider = document.getElementById("shadeSlider");
const foundation = document.getElementById("foundation");
const model = document.getElementById("model");

slider.addEventListener("change", e =>{

    const sliderValue = slider.value;

    if (sliderValue >= 0 && sliderValue < 12) {
        foundation.src = '../images/foundation1.jpg';
        model.src = '../images/model1.jpg';
    }

    if (sliderValue >= 12 && sliderValue < 26) {
        foundation.src = '../images/foundation2.jpg';
        model.src = '../images/model2.jpg';
    }

    if (sliderValue >= 26 && sliderValue < 40) {
        foundation.src = '../images/foundation3.jpg';
        model.src = '../images/model3.jpg';
    }

    if (sliderValue >= 40 && sliderValue < 54) {
        foundation.src = '../images/foundation4.jpg';
        model.src = '../images/model4.jpg';
    }

    if (sliderValue >= 54 && sliderValue < 70) {
        foundation.src = '../images/foundation5.jpg';
        model.src = '../images/model5.jpg';
    }

    if (sliderValue >= 70 && sliderValue < 85) {
        foundation.src = '../images/foundation6.jpg';
        model.src = '../images/model6.jpg';
    }

    if (sliderValue >= 85 && sliderValue < 101) {
        foundation.src = '../images/foundation7.jpg';
        model.src = '../images/model7.jpg';
    }

});