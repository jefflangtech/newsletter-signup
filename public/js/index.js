const primaryContent = document.getElementById('primary-content');
const component = document.getElementById('component');
const componentMain = document.getElementById('main');
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

// Function to remove all child elements from within a containing element
const emptyElement = function(el) {

  while(el.firstChild) {
    el.firstChild.remove();
  }

};

// Function to create new elements in the dom, with optional attributes
// and append the new element to a specified parent
const createNewElement = function(el, parentEl, options={}) {

  const newEl = document.createElement(el);

  let elKeys = Object.keys(options);

  if(elKeys.length > 0) {

    for(let k = 0; k < elKeys.length; k++) {
      newEl.setAttribute(String(elKeys[k]), String(options[elKeys[k]]));
    }

  }

  parentEl.appendChild(newEl);

  return newEl;

};

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

const createResponseContent = function(emailForm) {

  // Response page content creation
  let domFragment = document.createDocumentFragment();

  let heroDiv = createNewElement('div', domFragment, {
    id: 'hero-image-wrapper'
  });
  createNewElement('img', heroDiv, {
    id: 'icon-success',
    src: 'public/images/icon-success.svg',
    alt: 'Styled check image'
  });

  let primaryContentDiv = createNewElement('div', domFragment, {
    id: 'primary-content'
  });

  let responseHeader = createNewElement('h1', primaryContentDiv, {});
  responseHeader.innerHTML = 'Thanks for subscribing!';

  let responseParagraph = createNewElement('p', primaryContentDiv, {});
  responseParagraph.innerHTML = `A confirmation email has been sent to <span class="body-bold">${emailForm.input.value}</span>. Please open it and click the button inside to confrim your subscription`;

  let responseFooter = createNewElement('div', primaryContentDiv, {
    id: 'email-wrapper',
    class: 'margin-block'
  });

  let dismissButton = createNewElement('input', responseFooter, {
    id: 'dismiss-submit',
    class: 'btn-primary',
    type: 'submit',
    value: 'Dismiss message'
  });

  emptyElement(componentMain);
  componentMain.appendChild(domFragment);

  toggleClass('response', component);
  toggleClass('response-grid', componentMain);

}

primaryContent.addEventListener('click', (event) => {

  event.preventDefault();

  if(event.target === emailForm.submit) {

    // Just some test code for the moment
    if(!validateEmail(emailForm.input.value)) {
      toggleClass('error', emailForm.input);
      toggleClass('hidden', emailForm.error);
    } else {
      history.pushState(null, "", 'index.html');
      createResponseContent(emailForm);
    }

  }


});

// For testing purposes
// const $f = {
//   emailForm: emailForm,
//   validateEmail: validateEmail
// };

// export default $f;

// import testModule from './test.js';

// testModule();