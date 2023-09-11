import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._submitButton = this._formElement.querySelectorAll('.popup__button');
    this._defaultText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};    
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(dataUs) {
    this._inputList.forEach(input => {
      input.value = dataUs[input.name];
    });
  }


  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitCallback(this._getInputValues());
    });  
    super.setEventListeners();
  }

  setupText(){
    this._submitButton.textContent = this._defaultText
  }
  

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
