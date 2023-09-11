
class Card {
  constructor(cardData, cardTemplateSelector, handleCardClick, openDelete, changeLike) {
    this._myid = cardData.myid;
    this._ownerid = cardData.owner._id;
    this._cardId = cardData._id;
    this._name = cardData.name;
    this._openDelete = openDelete;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._cardTemplateSelector = cardTemplateSelector;
    this._changeLike = changeLike;
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
      this._openDelete({ card: this, cardId: this._cardId});
    }

    deleteCard() {
      this._newCard.remove();
      this._newCard = null;
    }
    

    _handleLikeButton() {
      this._changeLike(this._likeButton, this._cardId);      
    }


    toggleLikes(likes){
      this._likeButton.classList.toggle('photo-grid__button_active');
      this._counter.textContent = likes.length;
    }

    _handleImageClick(){      
      this._handleCardClick({ name: this._name, link: this._link });
    }
    
  
    _setListeners() {
      this._deleteButton.addEventListener('click', () => this._handleClickDelete());
      this._likeButton.addEventListener('click', () => this._handleLikeButton());
      this._cardImage.addEventListener('click', () => this._handleImageClick());
    }
  
    _visibleTrash(){
      this._myid === this._ownerid ? this._deleteButton.style.display = 'block' : this._deleteButton.style.display = 'none'
    }

    _checkLike() {
      this._likes.forEach(item => {
        if (item._id === this._myid) {
            this._likeButton.classList.add('photo-grid__button_active')
            return
          }
      })
      this._counter.textContent = this._likesLength
    }


    generateCard() {
      this._newCard = this._getTemplate();
      this._textElement = this._newCard.querySelector('.photo-grid__text');
      this._cardImage = this._newCard.querySelector('.photo-grid__image');
      this._likeButton = this._newCard.querySelector('.photo-grid__button');
      this._deleteButton = this._newCard.querySelector('.photo-grid__trash');
      this._counter = this._newCard.querySelector('.photo-grid__counter');
      this._setData();
      this._setListeners();
      this._visibleTrash();
      this._checkLike();
  
      return this._newCard;
    }
  }
  
  export default Card;
  