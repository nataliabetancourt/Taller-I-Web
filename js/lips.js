import anime from "animejs";

//Getting HTML elements
const text = document.querySelector('.text');

//Splitting text for animation 
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

//Apply animation
anime.timeline({
    loop: false
})
.add ({
    targets: '.text span',
    translateY: [-600, 0], // [start value, end value]
    scale: [10, 1],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1500, //1.5 seconds
    delay: anime.stagger(100),
})