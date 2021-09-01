const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const password2 = document.getElementById('password2');
//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error'; //className will override your class
  small.innerText = message;
}
//Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not Valid');
  }
}
//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
//Check input Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input.id)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input.id)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
//Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Password does not match');
  }
}
//Get field name
function getFieldName(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

//Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, password, password2, email]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
