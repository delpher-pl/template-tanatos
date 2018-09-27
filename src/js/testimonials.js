const { moveSlide } = require('./slider.js');

const testimonialsSlider = document.querySelector('.testimonials__list');
const testimonialsPrev = document.querySelector('#testimonials-prev');
const testimonialsNext = document.querySelector('#testimonials-next');

testimonialsPrev.addEventListener('click', (ev) => {
  ev.preventDefault();
  moveSlide(-1, testimonialsSlider);
}, false);

testimonialsNext.addEventListener('click', (ev) => {
  ev.preventDefault();
  moveSlide(1, testimonialsSlider);
}, false);
