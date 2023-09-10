import Popup from './Popup.js';

class PopupWithDeleteForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitButton = this._formElement.querySelector('.popup__button_disabled');
    this._defaultText = this._submitButton.textContent;
  }



  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitCallback({ card: this._element, cardId: this._cardId});
    });  
    super.setEventListeners();
  }
 
  setupText(){
    this._submitButton.textContent = this._defaultText
  }

  open = ({card, cardId}) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  }
}

export default PopupWithDeleteForm;
