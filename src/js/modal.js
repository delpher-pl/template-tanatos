const { Validate } = require('./validate.js');

// Close modal
const modalRoot = document.querySelector('#page-modal');
const closeBtn = document.querySelector('#modal-close');

// Validate form
const emailInput = document.querySelector('#modal-email');
const subjectInput = document.querySelector('#modal-subject');
const messageInput = document.querySelector('#modal-message');
const submitBtn = document.querySelector('#modal-submit');

// Show modal
const menuSection = document.querySelector('#page-menu');


// Show modal after scroll
function showModal() {
  document.body.classList.add('modal__is-displayed');
  modalRoot.classList.remove('page__modal--hide');
  modalRoot.classList.add('page__modal--showing');
  setTimeout(() => {
    modalRoot.classList.remove('page__modal--showing');
  }, 500);
}

function hideModal() {
  document.body.classList.remove('modal__is-displayed');
  modalRoot.classList.add('page__modal--hiding');
  setTimeout(() => {
    modalRoot.classList.remove('page__modal--hiding');
    modalRoot.classList.add('page__modal--hide');
  }, 500);
}

function isMenuHidden() {
  return menuSection.classList.contains('page__menu--hide');
}

// Show modal
document.addEventListener('scroll', () => {
  if (window.pageYOffset > 500 && !localStorage.getItem('wasModalDisplayed') && isMenuHidden()) {
    showModal();
    localStorage.setItem('wasModalDisplayed', 'true');
  }
}, false);

// Close modal
modalRoot.addEventListener('click', (ev) => {
  if (ev.target === modalRoot) {
    hideModal();
  }
}, false);

closeBtn.addEventListener('click', () => {
  hideModal();
}, false);


// Validate form
const rules = [
  [emailInput, RegExp(emailInput.attributes.pattern.nodeValue)],
  [subjectInput, RegExp(subjectInput.attributes.pattern.nodeValue)],
  [messageInput, /.{3,}/i],
];

const validate = new Validate(rules, submitBtn);
validate.init();
