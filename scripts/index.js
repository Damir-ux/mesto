import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
 
const profilePopup = document.querySelector('.profile-popup');
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
 
const addPopup = document.querySelector('.popup-add');
const addPopupOpenButton = document.querySelector('.profile__button-add');
const addPopupCloseButton = addPopup.querySelector('.popup__close');
 
const imagePopup = document.querySelector('.popup-cards');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');


 
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



// function createCardElement(data) {
  
//   const cardElement = cardTemplate.content.cloneNode(true).querySelector('.photo-grid__item');
//   const imageElement = cardElement.querySelector('.photo-grid__image');
//   imageElement.src = data.link;
//   imageElement.alt = data.name;
 
//   const textElement = cardElement.querySelector('.photo-grid__text');
//   textElement.textContent = data.name;
 
//   const deleteButton = cardElement.querySelector('.photo-grid__trash');
  
//   deleteButton.addEventListener('click', function () {
//     cardElement.remove();
//   });
   
//   imageElement.addEventListener('click', function () {
//     popupPhoto.src = data.link;
//     popupPhoto.alt = data.name;
//     popupCaption.textContent = data.name;
//     openPopup(imagePopup);
//   });
 
//   const likeButton = cardElement.querySelector('.photo-grid__button');
//   likeButton.addEventListener('click', function () {
//     likeButton.classList.toggle('photo-grid__button_active');
//   });
 
//   return cardElement;
// }


  function openImagePopup (cardData) {
    // const imagePopup = document.querySelector('.popup-cards');
    // const popupPhoto = imagePopup.querySelector('.popup__photo');
    // const popupCaption = imagePopup.querySelector('.popup__photo-cap');  
    popupPhoto.src = cardData.link;
    popupPhoto.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imagePopup);
  }
 
// function addCard(data) {
//   const card = new Card(data, cardTemplateSelector, openImagePopup, data);
//   console.log(card);
//   const cardElement = card.generateCard();
//   cardContainer.prepend(cardElement);
// }
 
// initialCards.forEach(function (data) {
//   addCard(data);
// });


function createCard(data) {
  const card = new Card(data, cardTemplateSelector, openImagePopup, data);
  return card.generateCard();
}

function addCard(cardElement) {
  cardContainer.prepend(cardElement);
}

initialCards.forEach(function (data) {
  const cardElement = createCard(data);
  addCard(cardElement);
});

 
// const profileForm = document.forms.PopupForm;

const profileValidatorSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

const profileForm = profilePopup.querySelector('.popup__form');
const profileFormValidator = new FormValidator(profileValidatorSettings, profileForm);
profileFormValidator.enableValidation();

// const addForm = document.forms['add-form'];
const addValidatorSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

const addForm = addPopup.querySelector('.popup__form');
const addFormValidator = new FormValidator(addValidatorSettings, addForm);
addFormValidator.enableValidation();

 
profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const nameInput = profileForm.elements.name;
  const professionInput = profileForm.elements.profession;
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = professionInput.value;
  closePopup(profilePopup);
  // const submitButtonElement = profileForm.querySelector('.popup__button');
  // const inactiveButtonClass = 'popup__button_disabled';
  // disableSubmitButton(submitButtonElement, inactiveButtonClass);
});
 
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const titleInput = addForm.elements.title;
  const linkInput = addForm.elements.link;
  const newData = {
    name: titleInput.value,
    link: linkInput.value
  };
  addCard(newData);
  addForm.reset();
  closePopup(addPopup);

  // отключение кнопки отправки
  addFormValidator.handleButtonState();
  // const submitButtonElement = addForm.querySelector('.popup__button');
  // const inactiveButtonClass = 'popup__button_disabled';
  // disableSubmitButton(submitButtonElement, inactiveButtonClass);
});


 
profilePopupOpenButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  professionInput.value = profileSubtitle.textContent;
  openPopup(profilePopup);
});
 
profilePopupCloseButton.addEventListener('click', function () {
  closePopup(profilePopup);
});
 
addPopupOpenButton.addEventListener('click', function () {
  openPopup(addPopup);
});
 
addPopupCloseButton.addEventListener('click', function () {
  closePopup(addPopup);
});
 
imagePopupCloseButton.addEventListener('click', function () {
  closePopup(imagePopup);
});

profilePopupContainer.addEventListener('click', handleOverlayClick);
addPopupContainer.addEventListener('click', handleOverlayClick);
imagePopupContainer.addEventListener('click', handleOverlayClick);



