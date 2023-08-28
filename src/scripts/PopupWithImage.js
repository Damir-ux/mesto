import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupCaption = this._popup.querySelector('.popup__photo-cap');
  }

  open = ({ name, link })  => {
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
