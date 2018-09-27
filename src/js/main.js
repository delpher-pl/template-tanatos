
// NEWSLETTER
const newsletterBtn = document.querySelector('#newsletter-submit');
newsletterBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
});

// FUNCTIONS
function showslide(pageNumber, sliderEl) {
  sliderEl.setAttribute(
    'style',
    `transform:translateX(-${100 * pageNumber}%)`,
  );
}

function moveSlide(moveSteps, sliderEl) {
  const SLIDER_EL = sliderEl;

  const slidesCount = SLIDER_EL.children.length;
  let currentSlide = +SLIDER_EL.dataset.currentslide;
  currentSlide += moveSteps;
  if (currentSlide < 0) {
    currentSlide = slidesCount - 1;
  }
  SLIDER_EL.dataset.currentslide = currentSlide;

  SLIDER_EL.setAttribute(
    'style',
    `transform:translateX(-${(100 * currentSlide) % (slidesCount * 100)}%)`,
  );
}

// TEAM
const teamSlider = document.querySelector('.team__slider');
const teamPagination = document.querySelector('#team-pagination');
let selectedSlide = 0;

teamPagination.addEventListener('change', (ev) => {
  selectedSlide = ev.target.value;
  showslide(selectedSlide, teamSlider);
}, false);

// TESTIMONIALS
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
