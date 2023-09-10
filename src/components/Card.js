import PopupWithImage from './PopupWithImage.js';

class Card {
  constructor(dCard, cardTemplateSelector, handleCardClick, changeLike, openDelete) {
    console.log(dCard);
    this._myid = dCard.myid;
    this._ownerid = dCard._id;
    this._cardId = dCard._id;
    this._name = dCard.name;
    this._openDelete = openDelete;
    this._link = dCard.link;
    this._likes = dCard.likes;
    this._likes = dCard.likes || [];
    // this._likesCount = dCard.likes.length;
    this._cardTemplateSelector = cardTemplateSelector;
    this._changeLike = changeLike;
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
      // this._newCard.remove();
      // this._newCard = null;
      // this._openDelete(this, this._cardId);
    }

    deleteCard() {
      this._newCard.remove();
      this._newCard = null;
    }
    

    _handleLikeButton() {
      this._changeLike(this._likeButton, this._cardId)
      // this._likeButton.classList.toggle('photo-grid__button_active');
      // if (this._likeButton.classList.contains('photo-grid__button_active')) {
      //   this._likesCount++;
      //   this._addLike();
      // } else {
      //   this._likesCount--;
      //   this._removeLike();
      // }
      // this._counter.textContent = this._likesCount;
 
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
      const hasLiked = this._likes.some(item => item._id === this._myid);
      if (hasLiked) {
        this._likeButton.classList.add('photo-grid__button_active');
      }
      this._counter.textContent = this._likesLength;
    }


    generateCard() {
      this._newCard = this._getTemplate();
      this._textElement = this._newCard.querySelector('.photo-grid__text');
      this._cardImage = this._newCard.querySelector('.photo-grid__image');
      this._likeButton = this._newCard.querySelector('.photo-grid__button');
      this._deleteButton = this._newCard.querySelector('.photo-grid__trash');
      this._counter = this._newCard.querySelector('.photo-grid__counter');
      this._counter.textContent = this._likesCount;
      this._setData();
      this._setListeners();
      this._visibleTrash();
      this._checkLike();
  
      return this._newCard;
    }
  }
  
  export default Card;
  