// const saveButton = profileForm.querySelector('.popup__button');
// const createButton = addForm.querySelector('.popup__button');


// function showError(inputElement, errorElement){
//     inputElement.classList.add("popup__input_error");
//     errorElement.textContent = inputElement.validationMessage;
//   }
  
//   function hideError(inputElement, errorElement){
//     inputElement.classList.remove("popup__input_error");
//     errorElement.textContent = inputElement.validationMessage;
//   }
  
  
//   function checkInputValidity(inputElement, formElement){
//   const isInputValid = inputElement.validity.valid;
//   const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
//   console.log(errorElement);
//   if(!isInputValid){
//     showError(inputElement, errorElement)
//   }
//   else{
//     hideError(inputElement, errorElement)
//   }

//   const submitButtonElement = formElement.querySelector(".popup__button");
//   const isFormValid = formElement.checkValidity();

//   if (isFormValid) {
//     submitButtonElement.removeAttribute("disabled");
//     submitButtonElement.classList.remove("popup__button_disabled");
//   } else {
//     submitButtonElement.setAttribute("disabled", "true");
//     submitButtonElement.classList.add("popup__button_disabled");
//   }

//   }
  
//   // function toggleButtonState(buttonElement, isActive){
//   //   if(!isActive){
//   //     buttonElement.disabled = "disabled";
//   //     buttonElement.classList.add(".popup__button_disabled")
//   //   }
//   //   else{
//   //     buttonElement.disabled = false;
//   //     buttonElement.classList.remove(".popup__button_disabled")
//   //   }
  
//   // }
  
  
//   function setEventListener(formElement) {
//     const inputList = formElement.querySelectorAll(".popup__input");
    
//     const submitButtonElement = formElement.querySelector(".popup__button");
  
//     // toggleButtonState(buttonElement, formElement.checkValidity());
//     [...inputList].forEach(function(inputElement){
//       inputElement.addEventListener("input", function(){      
//         // toggleButtonState(buttonElement, formElement.checkValidity());
//         checkInputValidity(inputElement, formElement);
//       });
      
//     })
  
    
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       if(!formElement.checkValidity()) return;
//      })

//     }

  
//   function enableValidation() {
//     const formsList = document.querySelectorAll('.popup__form');
//     [...formsList].forEach( function (formElement) {
//       setEventListener(formElement);
//     });
//     }
  
//     enableValidation()


function showError(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideError(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(inputElement, formElement, { inputErrorClass, errorClass }) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

  if (!isInputValid) {
    showError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideError(inputElement, errorElement, inputErrorClass, errorClass);
  }

  const submitButtonElement = formElement.querySelector('.popup__button');
  const isFormValid = formElement.checkValidity();

  if (isFormValid) {
    submitButtonElement.removeAttribute('disabled');
    submitButtonElement.classList.remove('popup__button_disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
    submitButtonElement.classList.add('popup__button_disabled');
  }
}

function setEventListener(formElement, { inputSelector, ...validationSettings }) {
  const inputList = formElement.querySelectorAll(inputSelector);

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
  errorClass: 'popup__error_visible'
});

