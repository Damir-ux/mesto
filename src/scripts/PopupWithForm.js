import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  getInputValues() {
    this._inputValues = {};    
    this._inputValues.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(dataUs) {
    this._inputValues.forEach(input => {
    input.value = dataUs[input.name];
    });
  }


  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitCallback);    
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
