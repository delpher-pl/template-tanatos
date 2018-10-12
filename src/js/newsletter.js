const { Validate } = require('./validate.js');

const emailInput = document.querySelector('#newsletter-email');
const submitBtn = document.querySelector('#newsletter-submit');

const rules = [
  [emailInput, RegExp(emailInput.attributes.pattern.nodeValue)]
];

const validate = new Validate(rules, submitBtn);
validate.init();
