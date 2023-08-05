class Card {
  constructor({ name, link }, cardTemplateSelector, openImagePopup, cardData) {
    this._cardData = cardData;
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._openImagePopup = openImagePopup;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector('#card-template')
        .content.querySelector('.photo-grid__item')
        .cloneNode(true);
  
      return cardElement;
    }

    _setData() {
      const text = this._newCard.querySelector('.photo-grid__text');
      text.textContent = this._name;
  
      const imageElement = this._newCard.querySelector('.photo-grid__image');
      imageElement.src = this._link;
      imageElement.alt = this._name;
    }
  
    _handleClickDelete() {
      this._newCard.remove();
      this._newCard = null;
    }
  
    _handleLikeButton() {
      this._likeButton.classList.toggle('photo-grid__button_active');
    }

    _handleImageClick(){
      this._openImagePopup(this._cardData);
    }
    
  
    _setListeners() {
      const deleteButton = this._newCard.querySelector('.photo-grid__trash');  
      deleteButton.addEventListener('click', () => this._handleClickDelete());

      const likeButton = this._newCard.querySelector('.photo-grid__button');
      likeButton.addEventListener('click', () => this._handleLikeButton());
  
      const imageElement = this._newCard.querySelector('.photo-grid__image');
      imageElement.addEventListener('click', () => this._handleImageClick());
    }
  

    generateCard() {
      this._newCard = this._getTemplate();
      this._likeButton = this._newCard.querySelector('.photo-grid__button');
      this._setData();
      this._setListeners();
  
      return this._newCard;
    }
  }
  
  export default Card;
  