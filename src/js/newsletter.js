const { isValidEmail } = require('./validate.js');

const newsletterInput = document.querySelector('#newsletter-email');
const newsletterBtn = document.querySelector('#newsletter-submit');

newsletterInput.addEventListener('change', (ev) => {
  const INPUT_EL = ev.target;
  INPUT_EL.value = INPUT_EL.value.toLowerCase();

  if (isValidEmail(INPUT_EL.value)) {
    newsletterBtn.classList.remove('btn--error');
    newsletterBtn.value = 'Subscribe';
  }
}, false);

newsletterBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const BUTTON_EL = ev.target;

  if (isValidEmail(newsletterInput.value)) {
    console.log('Valid email! Can send it to server.');
    BUTTON_EL.classList.remove('btn--error');
    BUTTON_EL.value = 'Subscribe';
  } else {
    BUTTON_EL.classList.add('btn--error');
    BUTTON_EL.value = 'Invalid email!';
  }
}, false);
