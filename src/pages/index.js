import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteForm from '../components/PopupWithDeleteForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api";
import { data } from "autoprefixer";



const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle',
  profileSelector: '.profile__avatar'
});

const currentUserInfo = userInfo.getUserInfo();


const cardTemplateSelector = '#card-template';
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
// const buttonCloseList = document.querySelectorAll('.popup__close');
const addPopupOpenButton = document.querySelector('.profile__button-add');
const avatarOpenPopup = document.querySelector('.profile__avatar');
// const cardContainer = document.querySelector('.photo-grid');
const deleteOpenPopup = document.querySelector('photo-grid__trash');

const cardElementSelector = '.photo-grid';
const profilePopupSelector = '.profile-popup';
const addCardPopupSelector = '.popup-add';
const avatarPopupSelector = '.popup-avatar';
const deletePopupSelector = '.popup_type_delete';

// const editAvatarPopupSelector = '.popup-edit-avatar';
const imagePopup = new PopupWithImage('.popup-cards');


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
 

const cardSection = new Section((element) => {
  cardSection.appendItem(createCard(element))},
  cardElementSelector
);


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '751e4ae6-349e-4ceb-83c0-e92078a56011',
    'Content-Type': 'application/json'
  }
})
 

const profilePopup = new PopupWithForm(profilePopupSelector, (data) => {
  api.setUserInfo(data)
  .then(res => {
    userInfo.setUserInfo({name: res.name, profession: res.about, avatar: res.avatar })
    profilePopup.close()
  })
  .catch((error) => console.error(`Ошибка редактирования профиля ${error}`))
  .finally(() => profilePopup.setupText())
  profilePopup.close();
});


profilePopup.setEventListeners();

const changeLike = (likeElement, cardId) => {
  
};

function createCard(element) {
  const card = new Card(element, cardTemplateSelector, handleCardClick, changeLike, (likeElement, cardId) => {
    if(likeElement.classList.contains('photo-grid__button_active'))
    {
      api.removeLike(cardId)
      .then(() => {
        console.log(res)
        card.toggleLikes(res.likes);
       })
       .catch((error) => console.error(`Ошибка дизактивации лайка ${error}`))
    } else {
      api.addLike(cardId)
      .then(res => {
        card.toggleLikes(res.likes);
       })
       .catch((error) => console.error(`Ошибка активации лайка ${error}`))
    }
  });
  return card.generateCard();
}


const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => {
  Promise.all([api.getInfo(), api.addCard(formData)])
     .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      cardSection.prependItem(createCard(dataCard))
      addCardPopup.close();
     })
     .catch((error) => console.error(`Ошибка ${error}`))
     .finally(() => addCardPopup.setupText())
});


const deletePopup = new PopupWithDeleteForm(deletePopupSelector, ({card, cardId}) => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      deletePopup.close();
    })
    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
    .finally(() => deletePopup.submitButton.textContent = 'Да' );
});


const avatarEditPopup = new PopupWithForm(avatarPopupSelector, (data) => {
  api.setAvatar(data)
    .then(res => {
      userInfo.setUserInfo({name: res.name, profession: res.about, avatar: res.avatar});
      avatarEditPopup.close();
    })
    .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
    .finally(() => avatarEditPopup.setupText());
});

avatarEditPopup.setEventListeners();
addCardPopup.setEventListeners();
deletePopup.setEventListeners();

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

const avatarForm = avatarEditPopup._formElement;
const avataFormValidator = new FormValidator(validatorSettings, avatarForm);
avataFormValidator.enableValidation();

profilePopupOpenButton.addEventListener('click', function () {  
  profilePopup.setInputValues(currentUserInfo);
  profileFormValidator.resetValidation();
  profilePopup.open();
});
 
addPopupOpenButton.addEventListener('click', function () { 
  addFormValidator.resetValidation();
  addCardPopup.open();
});
 

// Функция открытия Popup аватара 
avatarOpenPopup.addEventListener('click', () => {
  avataFormValidator.resetValidation();
  avatarEditPopup.open();
})

// deleteOpenPopup.addEventListener('click', () => {
//   deletePopup.open();
// });

imagePopup.setEventListeners();
// popupFormAvatar.setEventListeners();

Promise.all([api.getInfo(), api.getCards()])
.then(([dataUser, dataCard]) => { 
  console.log(dataUser);
  dataCard.forEach(element => element.myid = dataUser._id);
 userInfo.setUserInfo({name: dataUser.name, profession: dataUser.about, avatar: dataUser.avatar })
 cardSection.addCardFromServ(dataCard);
//  console.log(dataCard);
})
.catch((error) => console.error(`Ошибка ${error}`));