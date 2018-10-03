const { isValidEmail } = require('./validate.js');

const newsletterInput = document.querySelector('#newsletter-email');
const newsletterBtn = document.querySelector('#newsletter-submit');

newsletterInput.addEventListener('change', (ev) => {
  const INPUT_EL = ev.target;
  INPUT_EL.value = INPUT_EL.value.toLowerCase();

  if (isValidEmail(INPUT_EL.value)) {
    newsletterBtn.classList.remove('btn--error');
  }
}, false);

newsletterBtn.addEventListener('click', (ev) => {
  ev.preventDefault();

  if (isValidEmail(newsletterInput.value)) {
    console.log('Valid email! Can send it to server.');
    ev.target.classList.remove('btn--error');
  } else {
    ev.target.classList.add('btn--error');
  }
}, false);
