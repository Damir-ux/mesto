
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

function enableSubmitButton(submitButtonElement, inactiveButtonClass) {
  submitButtonElement.removeAttribute('disabled');
  submitButtonElement.classList.remove(inactiveButtonClass);
}

function disableSubmitButton(submitButtonElement, inactiveButtonClass) {
  submitButtonElement.setAttribute('disabled', 'true');
  submitButtonElement.classList.add(inactiveButtonClass);
}

function handleButtonState(submitButtonElement, isFormValid, inactiveButtonClass) {
  if (isFormValid) {
    enableSubmitButton(submitButtonElement, inactiveButtonClass);
  } else {
    disableSubmitButton(submitButtonElement, inactiveButtonClass);
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

  // handleButtonState(submitButtonElement, isFormValid, inactiveButtonClass);

  [...inputList].forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      // handleButtonState(submitButtonElement, isFormValid, inactiveButtonClass);
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