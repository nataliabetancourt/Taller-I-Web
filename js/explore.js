import anime from 'animejs/lib/anime.es.js';

//initialize init when DOM is completely loaded
document.addEventListener("DOMContentLoaded", init);

const button = document.querySelector(".gotoBtn");
let newIndex = 0;

button.addEventListener("click",() => {

if(newIndex == 0){
  window.location.href = "./lips.html";
}

});

function init() {
    const slider = document.querySelector(".slider");
    const nextBtn = slider.querySelector(".next");
    const prevBtn = slider.querySelector(".prev");
    const category = slider.querySelectorAll(".category");

    let current = 0;
  
    category.forEach((item) => {
      const textTitle = item.querySelector(".category__content__title");
      textTitle.innerHTML = textTitle.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
      
    });
  
    //animations
    function animation(current, next, callback) {

      const currentImgs = current.querySelectorAll(".category__imgs__grid__img");
      const currentText = current.querySelectorAll(".category__content .letter");
      const nextImgs = next.querySelectorAll(".category__imgs__grid__img");
      const nextText = next.querySelectorAll(".category__content .letter");
  
      //time between sliders
      const t = 800;
      const offset = "-=400";
      const imgOffset = 600;
  
      //synchronise animations
      const tl = anime.timeline({
        easing: "easeInOutQuint",
        duration: t,
        complete: callback
      });

      tl.add({
        targets: currentText,
        translateY: [0, '-.75em'],
        opacity: [1, 0],
        easing: "easeInQuint",
        duration: t,
        delay: (el, i) => 10 * (i + 1)
        
      }
      )
        .add(
          {
            targets: currentImgs[0],
            translateY: -600,
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          offset
        )
        .add(
          {
            targets: currentImgs[1],
            translateY: -600,
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: currentImgs[2],
            translateY: -600,
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: currentImgs[3],
            translateY: -600,
            translateZ: 0,
            opacity: [1, 0],
            easing: "easeInCubic"
          },
          "-=" + imgOffset
        )
        .add({
          targets: current,
          opacity: 0,
          visibility: 'hidden',
          duration: 10,
          easing: "easeInCubic"
        })
        .add(
          {
            targets: next,
            opacity: 1,
             visibility: 'visible',
            duration: 10
          },
          offset
        )
        .add(
          {
            targets: nextImgs[0],
            translateY: [600, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          offset
        )
        .add(
          {
            targets: nextImgs[1],
            translateY: [600, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: nextImgs[2],
            translateY: [600, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: nextImgs[3],
            translateY: [600, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutCubic"
          },
          "-=" + imgOffset
        )
        .add(
          {
            targets: nextText,
            translateY: ['.75em', 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutQuint",
            duration: t*1.5,
            delay: (el, i) => 10 * (i + 1)
          },
          offset
        );
    }
  
    let isPlaying = false;
  
    function updateSlider(newIndex) {
      const currentItem = category[current];
      const newItem = category[newIndex];
  
      function callback() {
        currentItem.classList.remove("is-active");
        newItem.classList.add("is-active");
        current = newIndex;
        isPlaying = false;
      }
  
      animation(currentItem, newItem, callback);
    }
  
    function next() {
      if (isPlaying) return;
      isPlaying = true;
      newIndex = current === category.length - 1 ? 0 : current + 1;
      updateSlider(newIndex);
    }
  
    function prev() {
      if (isPlaying) return;
      isPlaying = true;
      newIndex = current === 0 ? category.length - 1 : current - 1;
      updateSlider(newIndex);
    }
  
    

    nextBtn.onclick = next;
    prevBtn.onclick = prev;
  }