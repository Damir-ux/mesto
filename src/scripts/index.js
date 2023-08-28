import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const cardTemplateSelector = '#card-template';
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
const buttonCloseList = document.querySelectorAll('.popup__close');
const addPopupOpenButton = document.querySelector('.profile__button-add'); 
const cardContainer = document.querySelector('.photo-grid');

const cardElementSelector = '.photo-grid';
const profilePopupSelector = '.profile-popup';


const imagePopup = new PopupWithImage('.popup-cards');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
});

const profilePopup = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(profilePopup.getInputValues())
  profilePopup.close();
});

const addCardPopup = new PopupWithForm('.popup-add', handleAddCardFormSubmit);
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
 
const nameInput = document.querySelector('.popup__input_type_name');
const professionInput = document.querySelector('.popup__input_type_profession');

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


// function handleEditProfileFormSubmit(formData) {

//   userInfo.setUserInfo(formData);
// }

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

function openImagePopup(cardData) {
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
 
// profileForm.addEventListener('submit', function (event) {
//   event.preventDefault();
  
//   const nameInput = profileForm.elements.name;
//   const professionInput = profileForm.elements.profession;
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = professionInput.value;  
//   editProfilePopup.close();
// });
 
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const titleInput = addForm.elements.title;
  const linkInput = addForm.elements.link;
  const newData = {
    name: titleInput.value,
    link: linkInput.value
  };
  const cardElement = createCard(newData);
  cardSection.addItem(cardElement);
  addForm.reset();
  addCardPopup.close();
  addFormValidator.handleButtonState();

});
 
profilePopupOpenButton.addEventListener('click', function () {
  const currentUserInfo = userInfo.getUserInfo();
  // nameInput.value = currentUserInfo.name;
  // professionInput.value = currentUserInfo.about;  
  profilePopup.open();
  profileFormValidator.resetValidation();
  addFormValidator.resetValidation();
});
 

 
addPopupOpenButton.addEventListener('click', function () {
 
  addCardPopup.open();
});
 


buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => popup.close());
});




addCardPopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners();