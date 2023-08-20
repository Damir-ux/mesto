import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';


const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});
 
// const profilePopup = document.querySelector('.profile-popup');
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
// const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
const buttonCloseList = document.querySelectorAll('.popup__close');

// const addPopup = document.querySelector('.popup-add');
const addPopupOpenButton = document.querySelector('.profile__button-add');
// const addPopupCloseButton = addPopup.querySelector('.popup__close');
 
// const imagePopup = document.querySelector('.popup-cards');
// const imagePopupCloseButton = imagePopup.querySelector('.popup__close');


 
const cardContainer = document.querySelector('.photo-grid');


 
// createCardElement
const cardTemplateSelector = '#card-template';
 
const popupPhoto = imagePopup.querySelector('.popup__photo');
const popupCaption = imagePopup.querySelector('.popup__photo-cap');

 
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
 
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const professionInput = profilePopup.querySelector('.popup__input_type_profession');
// оверлей
const profilePopupContainer = document.querySelector('.profile-popup');
const addPopupContainer = document.querySelector('.popup-add');
const imagePopupContainer = document.querySelector('.popup-cards');


const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCardElement(item, openImagePopup);
      cardSection.addItem(cardElement);
    }
  },
  '.photo-grid'
);

cardSection.renderItems();

const profilePopup = new Popup('.profile-popup');
const addPopup = new Popup('.popup-add');
// const imagePopup = new Popup('.popup-cards');

const imagePopup = new PopupWithImage('.popup-cards');
imagePopup.setEventListeners();

const currentUserInfo = userInfo.getUserInfo();
console.log(currentUserInfo);


function openImagePopup(cardData) {
  imagePopup.open(cardData);
}




function handleEscKey(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

 
function openPopup(popup) {
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleEscKey);  
  }

 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);    
}


function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}


  function openImagePopup (cardData) {
    popupPhoto.src = cardData.link;
    popupPhoto.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imagePopup);
  }

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick, data);
  return card.generateCard();
}

function addCard(cardElement) {
  cardContainer.prepend(cardElement);
}

initialCards.forEach(function (data) {
  const cardElement = createCard(data, openImagePopup);
  addCard(cardElement);
});


const validatorSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

const profileForm = profilePopup.querySelector('.popup__form');
const profileFormValidator = new FormValidator(validatorSettings, profileForm);
profileFormValidator.enableValidation();



const addForm = addPopup.querySelector('.popup__form');
const addFormValidator = new FormValidator(validatorSettings, addForm);
addFormValidator.enableValidation();

 
profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const nameInput = profileForm.elements.name;
  const professionInput = profileForm.elements.profession;
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  closePopup(profilePopup);
});
 
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const titleInput = addForm.elements.title;
  const linkInput = addForm.elements.link;
  const newData = {
    name: titleInput.value,
    link: linkInput.value
  };
  addCard(createCard(newData));
  addForm.reset();
  closePopup(addPopup);

  // отключение кнопки отправки
  addFormValidator.handleButtonState();
});


 
profilePopupOpenButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  professionInput.value = profileSubtitle.textContent;
  // openPopup(profilePopup);
  profilePopup.open();
  profileFormValidator.resetValidation();
  addFormValidator.resetValidation();
});
 
// profilePopupCloseButton.addEventListener('click', function () {
//   closePopup(profilePopup);
// });
 
addPopupOpenButton.addEventListener('click', function () {
  // openPopup(addPopup);
  addPopup.open();
});
 
// addPopupCloseButton.addEventListener('click', function () {
//   closePopup(addPopup);
// });
 
// imagePopupCloseButton.addEventListener('click', function () {
//   closePopup(imagePopup);
// });


buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  popup.addEventListener('mousedown', handleOverlayClick);
  btn.addEventListener('click', () => closePopup(popup)); 
}) 


profilePopupContainer.addEventListener('click', handleOverlayClick);
addPopupContainer.addEventListener('click', handleOverlayClick);
imagePopupContainer.addEventListener('click', handleOverlayClick);

profilePopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

