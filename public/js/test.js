// Test module for the newsletter signup form

import $f from "./index.js";

const testModule = function() {

  // Email validation test
  let emailValTestCases = [
    ['email@mail.com', true],
    ['email$@mail.com', false],
    ['', false],
    [1, false],
    ['   hello@hello.com', true, 'This test case was trimmed'],
    [{email:'email@mail.com'}, false],
    ['areallysuperlongemailthatismorethantwohundredandfiftyfourcharacterslongsothatittriggerstheemailvalidationaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafunctionbyreturningfalsefromsomethingthatisoverlylong@thisissuchasuperlongemail.com', false]
  ];

  let errorCount = 0;
  
  for(let email of emailValTestCases) {
    if($f.validateEmail(email[0]) !== email[1]) {

      errorCount++;
      console.log(`Test case: ${email[0]}, expecting: ${email[1]}, received: ${$f.validateEmail(email[0])}`);
      if(email[2]) { console.log(`NOTE: ${email[2]}`)}

    }
  }

  if(!errorCount) {
    console.log(`All tests passed!`);
  }

};

export default testModule;
