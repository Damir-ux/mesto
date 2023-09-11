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
  profileSelector: '.profile__under-img'
});

const currentUserInfo = userInfo.getUserInfo();


const cardTemplateSelector = '#card-template';
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
const addPopupOpenButton = document.querySelector('.profile__button-add');
const avatarOpenPopup = document.querySelector('.profile__avatar');
const deleteOpenPopup = document.querySelector('photo-grid__trash');

const cardElementSelector = '.photo-grid';
const profilePopupSelector = '.profile-popup';
const addCardPopupSelector = '.popup-add';
const avatarPopupSelector = '.popup-avatar';
const deletePopupSelector = '.popup_type_delete';


const imagePopup = new PopupWithImage('.popup-cards');
 

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


// Спасибо!!! И за ссылку тоже!

function createCard(element) {
  const deleteImage = (cardElement, cardId) => {
    deletePopup.open(cardElement, cardId)
    }

  const card = new Card(element, cardTemplateSelector, handleCardClick, deleteImage, (likeElement, cardId) => {
    if(likeElement.classList.contains('photo-grid__button_active')) {
      api.removeLike(cardId)
        .then(res => {
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



let userId;

api.getInfo()
  .then(dataUser => {
    userId = dataUser.id;
  })
  .catch(error => console.error(`Error: ${error}`));
  const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => { 
    api.addCard(formData)
      .then(dataCard => {
        dataCard.myid = userId;
        cardSection.prependItem(createCard(dataCard));
        addCardPopup.close();
      })
      .catch(error => console.error(`Error: ${error}`))
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
  profilePopup.setInputValues(userInfo.getUserInfo());
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


imagePopup.setEventListeners();



Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    userId = dataUser._id;
    dataCard.forEach(element => element.myid = userId);
    userInfo.setUserInfo({name: dataUser.name, profession: dataUser.about, avatar: dataUser.avatar });
    cardSection.addCardFromServ(dataCard);
  })
  .catch((error) => console.error(`Error: ${error}`));





