const { showslide } = require('./slider.js');

const teamSlider = document.querySelector('.team__slider');
const teamPagination = document.querySelector('#team-pagination');
let selectedSlide = 0;

teamPagination.addEventListener('change', (ev) => {
  selectedSlide = ev.target.value;
  showslide(selectedSlide, teamSlider);
}, false);
