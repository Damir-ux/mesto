
// function disableSubmitButton(submitButtonElement, inactiveButtonClass) {
//   submitButtonElement.setAttribute('disabled', 'true');
//   submitButtonElement.classList.add(inactiveButtonClass);
// }

// function enableSubmitButton(submitButtonElement, inactiveButtonClass) {
//   submitButtonElement.removeAttribute('disabled');
//   submitButtonElement.classList.remove(inactiveButtonClass);
// }

// function showInputError(inputElement, errorElement, inputErrorClass, errorClass) {
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   errorElement.classList.add(errorClass);
// }

// function hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.textContent = '';
//   errorElement.classList.remove(errorClass);
// }

// function checkInputValidity(inputElement, formElement, validationSettings) {
//   const isInputValid = inputElement.validity.valid;
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

//   if (!isInputValid) {
//     showInputError(inputElement, errorElement, validationSettings.inputErrorClass, validationSettings.errorClass);
//   } else {
//     hideInputError(inputElement, errorElement, validationSettings.inputErrorClass, validationSettings.errorClass);
//   }
// }

// function setEventListener(formElement, validationSettings) {
//   const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
//   const submitButtonElement = formElement.querySelector(validationSettings.submitButtonSelector);

//   // Disable submit button initially
//   disableSubmitButton(submitButtonElement, validationSettings.inactiveButtonClass);

//   [...inputList].forEach(function (inputElement) {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(inputElement, formElement, validationSettings);

//       // Validate the entire form on every input change
//       const isFormValid = formElement.checkValidity();
//       handleButtonState(submitButtonElement, isFormValid, validationSettings.inactiveButtonClass);
//     });
//   });

//   formElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//   });
// }

// function enableValidation(validationSettings) {
//   const formsList = document.querySelectorAll(validationSettings.formSelector);

//   [...formsList].forEach(function (formElement) {
//     setEventListener(formElement, validationSettings);
//   });
// }



function showInputError(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function handleButtonState(submitButtonElement, isFormValid, inactiveButtonClass) {
  if (isFormValid) {
    submitButtonElement.removeAttribute('disabled');
    submitButtonElement.classList.remove(inactiveButtonClass);
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
    submitButtonElement.classList.add(inactiveButtonClass);
  }
}

function checkInputValidity(inputElement, formElement, validationSettings) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  if (!isInputValid) {
    showInputError(inputElement, errorElement, validationSettings.inputErrorClass, validationSettings.errorClass);
  } else {
    hideInputError(inputElement, errorElement, validationSettings.inputErrorClass, validationSettings.errorClass);
  }

  const submitButtonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  const isFormValid = formElement.checkValidity();
  handleButtonState(submitButtonElement, isFormValid, validationSettings.inactiveButtonClass);
}

function setEventListener(formElement, validationSettings) {
  const inputList = formElement.querySelectorAll(validationSettings.inputSelector);

  [...inputList].forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, formElement, validationSettings);
    });
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
  });
}


function enableValidation(validationSettings) {
  const formsList = document.querySelectorAll(validationSettings.formSelector);

  [...formsList].forEach(function (formElement) {
    setEventListener(formElement, validationSettings);
  });
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
});