import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  getInputValues() {
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
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitCallback);    
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
