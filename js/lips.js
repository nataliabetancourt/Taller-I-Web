import anime from "animejs";

//Getting HTML elements
const text = document.querySelector('.text');
const images = document.querySelector('.images');

//Splitting text for animation 
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

function titleAnimation() {
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
}

function imageAnimation() {
    anime.timeline({
        loop: false,
        easing: 'easeOutExpo',
        duration: 1500
    })
    .add({
        targets: '.images__1',
        translateX: [600, 0],
        opacity: [0, 1],
    }, '+=400')
    .add({
        targets: '.images__2',
        translateX: [600, 0],
        opacity: [0, 1],
    }, '+=200')
    .add({
        targets: '.images__3',
        translateX: [600, 0],
        opacity: [0, 1],
    }, '+=200')
    .add({
        targets: '.images__1',
        opacity: [1, 0],
    }, '+=1000')
    .add({
        targets: '.images__4',
        opacity: [0, 1],
    }, '+=200')
    .add({
        targets: '.images__2',
        opacity: [1, 0],
    }, '+=1000')
    .add({
        targets: '.images__5',
        opacity: [0, 1],
    }, '+=200')
    .add({
        targets: '.images__3',
        opacity: [1, 0],
    }, '+=1000')
    .add({
        targets: '.images__6',
        opacity: [0, 1],
    }, '+=200')
    .add({
        targets: '.images__4',
        opacity: [1, 0],
    }, '+=1000')
    .add({
        targets: '.images__7',
        opacity: [0, 1],
    }, '+=200')
    .add({
        targets: '.images__5',
        opacity: [1, 0],
    }, '+=1000')
    .add({
        targets: '.images__8',
        opacity: [0, 1],
    }, '+=200')
    .add({
        targets: '.images__6',
        opacity: [1, 0],
    }, '+=1000')
    .add({
        targets: '.images__9',
        opacity: [0, 1],
    }, '+=200');    
}

titleAnimation();
imageAnimation();


