
function openPopup(popup) {
  popup.classList.add('popup_opened');
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


const profilePopup = document.querySelector('.profile-popup');
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');

profilePopupOpenButton.addEventListener('click', function () {
  openPopup(profilePopup);
});

profilePopupCloseButton.addEventListener('click', function () {
  closePopup(profilePopup);
});


const addPopup = document.querySelector('.popup-add');
const addPopupOpenButton = document.querySelector('.profile__button-add');
const addPopupCloseButton = addPopup.querySelector('.popup__close');

addPopupOpenButton.addEventListener('click', function () {
  openPopup(addPopup);
});

addPopupCloseButton.addEventListener('click', function () {
  closePopup(addPopup);
});


const imagePopup = document.querySelector('.popup-cards');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

imagePopupCloseButton.addEventListener('click', function () {
  closePopup(imagePopup);
});


function createCardElement(data) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.photo-grid__item');
  
  const imageElement = cardElement.querySelector('.photo-grid__image');
  imageElement.src = data.link;
  imageElement.alt = data.name;

  const textElement = cardElement.querySelector('.photo-grid__text');
  textElement.textContent = data.name;

  const deleteButton = cardElement.querySelector('.photo-grid__trash');
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  const viewButton = cardElement.querySelector('.photo-grid__image');
  viewButton.addEventListener('click', function () {
    const popupPhoto = imagePopup.querySelector('.popup__photo');
    const popupCaption = imagePopup.querySelector('.popup__photo-cap');

    popupPhoto.src = data.link;
    popupPhoto.alt = data.name;
    popupCaption.textContent = data.name;

    openPopup(imagePopup);
  });

  const likeButton = cardElement.querySelector('.photo-grid__button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('photo-grid__button_active');
  });

  return cardElement;
}


function addCard(data) {
  const cardContainer = document.querySelector('.photo-grid');
  const newCardElement = createCardElement(data);
  cardContainer.appendChild(newCardElement);
}


  const initialCards = [
      {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },

      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

initialCards.forEach(function (data) {
  addCard(data);
});


