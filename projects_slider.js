let images = [{
  url: "https://i.postimg.cc/sxW4zgSs/image-1.jpg",
  title: "Rostov-on-Don, Admiral"
}, {
  url: "https://i.postimg.cc/rm3N7rDf/image-2.jpg",
  title: "Sochi Thieves"
}, {
  url: "https://i.postimg.cc/dQZBr4fp/image-3.jpg",
  title: "Rostov-on-Don Patriotic"
}
];

function initSlider(options) {
if (!images || !images.length) return;

options = options || {
  autoplay: false
};

let sliderImages = document.querySelector(".slider__images");
let sliderArrows = document.querySelector(".slider__arrows");
let sliderDots = document.querySelector(".slider__dots");
let sliderTitle = document.querySelector(".galary-list");

initImagesTitleDots();
initArrows();

if (options.autoplay) {
  initAutoplay();
}

function initImagesTitleDots() {
  images.forEach((image, index) => {
    let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
    let title = `<li class="galary-item n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].title}</li>`;
    let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
    sliderImages.innerHTML += imageDiv;
    sliderTitle.innerHTML += title;
    sliderDots.innerHTML += dot;
  })
  sliderTitle.querySelectorAll(".galary-item").forEach(title => {
    title.addEventListener("click", function() {
      moveSlider(this.dataset.index);
    })
  })
  sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
    dot.addEventListener("click", function() {
      moveSlider(this.dataset.index);
    })
  })
}

function initArrows() {
  sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
    arrow.addEventListener("click", function() {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber;
      if (arrow.classList.contains("left")) {
        nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
      } else {
        nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      }
      moveSlider(nextNumber);
    });
  });
}



function moveSlider(num) {
  sliderImages.querySelector(".active").classList.remove("active");
  sliderImages.querySelector(".n" + num).classList.add("active");
  sliderTitle.querySelector(".active").classList.remove("active");
  sliderTitle.querySelector(".n" + num).classList.add("active");
  sliderDots.querySelector(".active").classList.remove("active");
  sliderDots.querySelector(".n" + num).classList.add("active");
}

function initAutoplay() {
  setInterval(() => {
    let curNumber = +sliderImages.querySelector(".active").dataset.index;
    let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
    moveSlider(nextNumber);
  }, options.autoplayInterval);
}
}

let sliderOptions = {
autoplay: true,
autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
initSlider(sliderOptions);
});