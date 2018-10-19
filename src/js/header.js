const { scrollToY } = require('./scroll.js');

const hireusBtn = document.querySelector('#header-hireus');
const ourworksBtn = document.querySelector('#header-ourworks');
const contactSection = document.querySelector('.page__contact');
const worksSection = document.querySelector('.page__works');

hireusBtn.addEventListener('touchend', (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  ev.target.click();
}, false);

hireusBtn.addEventListener('click', () => {
  scrollToY(contactSection.getBoundingClientRect().top + window.scrollY, 1500);
}, false);

ourworksBtn.addEventListener('touchend', (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  ev.target.click();
}, false);

ourworksBtn.addEventListener('click', () => {
  scrollToY(worksSection.getBoundingClientRect().top + window.scrollY, 1500);
}, false);
