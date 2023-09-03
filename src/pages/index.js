import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

const currentUserInfo = userInfo.getUserInfo();
console.log(currentUserInfo);

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




function createCardInstance(item) {
  const card = new Card(item, cardTemplateSelector, handleCardClick);
  return card;
}
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





const initialCardInstances = initialCards.map(createCardInstance);

const cardSection = new Section(
  {
    items: initialCardInstances,
    renderer: (cardInstance) => {      
      return cardInstance.generateCard();
    }
  },
  cardElementSelector
);

cardSection.renderItems()

const profilePopup = new PopupWithForm(profilePopupSelector, (inputValues) => {
  // evt.preventDefault();  
  // userInfo.setUserInfo(profilePopup.getInputValues()); 
  // userInfo.setUserInfo({
  //   name: 'Имя пользователя',
  //   about: 'Профессия пользователя'
  // });
  // const inputValues = profilePopup._getInputValues();
  userInfo.setUserInfo(inputValues);
  if (!inputValues.name) {
    inputValues.name = 'Имя пользователя';
  }
  if (!inputValues.about) {
    inputValues.about = 'Профессия пользователя';
  }
  profilePopup.close();
});

profilePopup.setEventListeners();


function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, handleCardClick);
  return card.generateCard();
}

const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => {
  const newCardData = {
    // title: formData.title,
    name: formData.title,
    link: formData.link
  };
  const newCardElement = createCard(newCardData);
  cardSection.addItem(newCardElement);
  addCardPopup.close();
});

addCardPopup.setEventListeners();

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
  // const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputValues(currentUserInfo);
  profileFormValidator.resetValidation();
  profilePopup.open();  
  // addFormValidator.clearErrors();
});
 
addPopupOpenButton.addEventListener('click', function () { 
  addFormValidator.resetValidation();
  addCardPopup.open();
});
 

imagePopup.setEventListeners();