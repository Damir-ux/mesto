class FormValidator {
    constructor(validationSettings, formElement) {
      this._validationSettings = validationSettings;
      this._formElement = formElement;
      this._submitButtonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
      this._inputList = this._formElement.querySelectorAll(this._validationSettings.inputSelector);
    }
  
    _showInputError(inputElement, errorElement) {
      inputElement.classList.add(this._validationSettings.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._validationSettings.errorClass);
    }
  
    _hideInputError(inputElement, errorElement) {
      inputElement.classList.remove(this._validationSettings.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._validationSettings.errorClass);
    }
  
    _checkInputValidity(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      const isInputValid = inputElement.validity.valid;
  
      if (!isInputValid) {
        this._showInputError(inputElement, errorElement);
      } else {
        this._hideInputError(inputElement, errorElement);
      }
    }
  
    _handleButtonState() {
      const isFormValid = this._formElement.checkValidity();
      if (isFormValid) {
        this._submitButtonElement.removeAttribute('disabled');
        this._submitButtonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      } else {
        this._submitButtonElement.setAttribute('disabled', 'true');
        this._submitButtonElement.classList.add(this._validationSettings.inactiveButtonClass);
      }
    }
  
    _setEventListeners() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._handleButtonState();
        });
      });
  
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleButtonState();
      });
    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
      this._setEventListeners();
    }
  }

  export default FormValidator;
  