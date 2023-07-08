

const primaryContent = document.getElementById('primary-content');
const emailForm = {
  input: document.getElementById('email'),
  submit: document.getElementById('email-submit'),
  error: document.getElementById('email-error')
};

// Utility function to toggle a class for one or more elements
const toggleClass = function(style, ...elements) {
  
  for(let el of elements) {
    el.classList.toggle(style);
  }

}

const validateEmail = function(emailInput) {

  if(typeof emailInput !== 'string' || emailInput.length > 254) {
    return false;
  }

  let email = emailInput.trim();
  let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // Regex pattern starts and ends with '/'
  // ^ this means start at the beginning of the string
  // [a-zA-Z0-9._-]+ is the match of any type in the brackets
  // the plus symbol means any number
  // the @ symbol is matched literally
  // [a-zA-Z0-9.-]+ same as above without the underscore
  // \. literal dot outside the brackets needs to be escaped
  // [a-zA-Z]{2,6} means match any lower/uppercase letters of 2-6 chars
  // $ means must end at end of string

  return pattern.test(email);

};

primaryContent.addEventListener('click', (event) => {

  event.preventDefault();

  if(event.target === emailForm.submit) {

    // Just some test code for the moment
    if(!validateEmail(emailForm.input.value)) {
      toggleClass('error', emailForm.input);
      toggleClass('hidden', emailForm.error);
    } else {
      console.log('Passed the test!');
    }

  }


});

// For testing purposes
const $f = {
  emailForm: emailForm,
  validateEmail: validateEmail
};

export default $f;

import testModule from './test.js';

// testModule();