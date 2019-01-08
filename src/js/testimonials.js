const { moveSlide } = require('./slider.js');
const { Swipe } = require('./swipe.js');
const { lazyUpdTimeout } = require('./lazyload.js');

const testimonialsSection = document.querySelector('.page__testimonials');
const testimonialsSlider = document.querySelector('.testimonials__list');
const testimonialsPrev = document.querySelector('#testimonials-prev');
const testimonialsNext = document.querySelector('#testimonials-next');

testimonialsSlider.addEventListener('changeSlide', () => {
  lazyUpdTimeout();
}, false);


testimonialsPrev.addEventListener('touchend', (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  ev.target.click();
}, false);

testimonialsPrev.addEventListener('click', (ev) => {
  ev.preventDefault();
  moveSlide(-1, testimonialsSlider);
  lazyUpdTimeout();
}, false);

testimonialsNext.addEventListener('touchend', (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  ev.target.click();
}, false);

testimonialsNext.addEventListener('click', (ev) => {
  ev.preventDefault();
  moveSlide(1, testimonialsSlider);
  lazyUpdTimeout();
}, false);


const swipe = new Swipe({
  detectEl: testimonialsSection,
  moveEl: testimonialsSlider,
});
swipe.init();
