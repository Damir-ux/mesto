import Popup from './Popup.js';

class PopupWithDeleteForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this.submitButton = this._popup.querySelector('.popup__button');
    this._defaultText = this.submitButton.textContent;
  }


  open = ({card, cardId}) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  }

  
  setEventListeners() {
    super.setEventListeners();
    this.submitButton.addEventListener('click', () => {
      this.submitButton.textContent = `${this.submitButton.textContent}...`
      this._submitCallback({ card: this._element, cardId: this._cardId});
    })
  }

}



export default PopupWithDeleteForm;
