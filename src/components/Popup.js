class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._popupContent = this._popup.querySelector('.popup__content');
      this._handleEscClose = this._handleEscClose.bind(this);
      this._popupCloseButton = this._popup.querySelector('.popup__close');
    }
  
    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    }

    _handleCloseButton = (event) => {      
        this.close();      
    }

    _handleClickByOverlay = (event) => {      
      if (event.target === this._popup) {
        this.close();
      }   
  }

  
    setEventListeners() {
      this._popupCloseButton.addEventListener('click', this._handleCloseButton);  
      this._popup.addEventListener('mousedown', this._handleClickByOverlay);
    }
  }
  
  export default Popup;
  