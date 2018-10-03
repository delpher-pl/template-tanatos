const { moveSlide } = require('./slider.js');
const { Swipe } = require('./swipe.js');

const testimonialsSection = document.querySelector('.page__testimonials');
const testimonialsSlider = document.querySelector('.testimonials__list');
const testimonialsPrev = document.querySelector('#testimonials-prev');
const testimonialsNext = document.querySelector('#testimonials-next');

testimonialsSlider.addEventListener('changeSlide', () => {
  console.log('changeSlide detected in testimonials!');
}, false);

testimonialsPrev.addEventListener('click', (ev) => {
  ev.preventDefault();
  moveSlide(-1, testimonialsSlider);
}, false);

testimonialsNext.addEventListener('click', (ev) => {
  ev.preventDefault();
  moveSlide(1, testimonialsSlider);
}, false);


const swipe = new Swipe({
  detectEl: testimonialsSection,
  moveEl: testimonialsSlider,
});
swipe.init();
