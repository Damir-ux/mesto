import PopupWithImage from './PopupWithImage.js';

class Card {
  constructor({ name, link }, cardTemplateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    // this._openImagePopup = openImagePopup;
    this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardTemplateSelector)
        .content.querySelector('.photo-grid__item')
        .cloneNode(true);
  
      return cardElement;
    }

    _setData() {
      this._textElement.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
    }
  
    _handleClickDelete() {
      this._newCard.remove();
      this._newCard = null;
    }
  
    _handleLikeButton() {
      this._likeButton.classList.toggle('photo-grid__button_active');
    }

    _handleImageClick(){
      // this._openImagePopup({ name: this._name, link: this._link });
      this._handleCardClick({ name: this._name, link: this._link });
    }
    
  
    _setListeners() {
      this._deleteButton.addEventListener('click', () => this._handleClickDelete());
      this._likeButton.addEventListener('click', () => this._handleLikeButton());
      this._cardImage.addEventListener('click', () => this._handleImageClick());
    }
  

    generateCard() {
      this._newCard = this._getTemplate();
      this._textElement = this._newCard.querySelector('.photo-grid__text');
      this._cardImage = this._newCard.querySelector('.photo-grid__image');
      this._likeButton = this._newCard.querySelector('.photo-grid__button');
      this._deleteButton = this._newCard.querySelector('.photo-grid__trash');
      this._setData();
      this._setListeners();
  
      return this._newCard;
    }
  }
  
  export default Card;
  