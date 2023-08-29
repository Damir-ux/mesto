import "../pages/index.css";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

const cardTemplateSelector = '#card-template';
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
// const buttonCloseList = document.querySelectorAll('.popup__close');
const addPopupOpenButton = document.querySelector('.profile__button-add'); 
// const cardContainer = document.querySelector('.photo-grid');

const cardElementSelector = '.photo-grid';
const profilePopupSelector = '.profile-popup';
const addCardPopupSelector = '.popup-add';


const imagePopup = new PopupWithImage('.popup-cards');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});


// const editProfilePopup = new PopupWithForm('.profile-popup', handleEditProfileFormSubmit);

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
 
// const nameInput = document.querySelector('.popup__input_type_name');
// const professionInput = document.querySelector('.popup__input_type_profession');

const currentUserInfo = userInfo.getUserInfo();
console.log(currentUserInfo);


const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {      
      const card = new Card(item, cardTemplateSelector, handleCardClick);
      return card.generateCard();      
    }
  },
  cardElementSelector
);

cardSection.renderItems()

const profilePopup = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(profilePopup.getInputValues());
  profilePopup.close();
});

profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(addCardPopupSelector, handleAddCardFormSubmit);

function handleAddCardFormSubmit(formData) {
  const newCardData = {
    name: formData.title,
    link: formData.link
  };
  const newCardElement = createCard(newCardData);
  addCard(newCardElement); 
  addCardPopup.close();
}

  function handleCardClick(cardData) {
    imagePopup.open(cardData);
  }



const validatorSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

const profileForm = profilePopup._formElement;
const profileFormValidator = new FormValidator(validatorSettings, profileForm);
profileFormValidator.enableValidation();

const addForm = addCardPopup._formElement;
const addFormValidator = new FormValidator(validatorSettings, addForm);
addFormValidator.enableValidation();
 
 
profilePopupOpenButton.addEventListener('click', function () {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputValues(currentUserInfo);
  profilePopup.open();
  profileFormValidator.resetValidation();
  addFormValidator.resetValidation();
});
 

 
addPopupOpenButton.addEventListener('click', function () { 
  addCardPopup.open();
});
 


addCardPopup.setEventListeners();
imagePopup.setEventListeners();