const { showslide, getCurrentSlide } = require('./slider.js');
const { Swipe } = require('./swipe.js');

const teamSection = document.querySelector('.page__team');
const teamSlider = document.querySelector('.team__slider');
const teamPagination = document.querySelector('#team-pagination');
let selectedSlide = 0;

function updatePagination(sliderEl) {
  const currentSlide = getCurrentSlide(sliderEl);
  teamPagination.querySelectorAll('label')[currentSlide].click();
}

teamSlider.addEventListener('changeSlide', () => {
  updatePagination(teamSlider);
}, false);

teamPagination.addEventListener('change', (ev) => {
  selectedSlide = ev.target.value;

  showslide(selectedSlide, teamSlider);
}, false);


const swipe = new Swipe({
  detectEl: teamSection,
  moveEl: teamSlider,
});
swipe.init();
