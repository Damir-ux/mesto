import Popup from './Popup.js';

class PopupWithImage extends Popup {
  open(cardData) {
    this._popup.querySelector('.popup__photo').src = cardData.link;
    this._popup.querySelector('.popup__photo').alt = cardData.name;
    this._popup.querySelector('.popup__photo-cap').textContent = cardData.name;
    super.open();
  }
}

export default PopupWithImage;
