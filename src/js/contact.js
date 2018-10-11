const { Validate } = require('./validate.js');

const emailInput = document.querySelector('#contact-email');
const subjectInput = document.querySelector('#contact-subject');
const messageInput = document.querySelector('#contact-message');
const submitBtn = document.querySelector('#contact-submit');

const rules = [
  [emailInput, RegExp(emailInput.attributes.pattern.nodeValue)],
  [subjectInput, RegExp(subjectInput.attributes.pattern.nodeValue)],
  [messageInput, /.{3,}/i],
];

const validate = new Validate(rules, submitBtn);
validate.init();
