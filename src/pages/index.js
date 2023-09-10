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
console.log(currentUserInfo);

const cardTemplateSelector = '#card-template';
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupOpenButton = document.querySelector('.profile__button-edit');
// const buttonCloseList = document.querySelectorAll('.popup__close');
const addPopupOpenButton = document.querySelector('.profile__button-add');
const avatarOpenPopup = document.querySelector('.profile__avatar');
// const cardContainer = document.querySelector('.photo-grid');

const cardElementSelector = '.photo-grid';
const profilePopupSelector = '.profile-popup';
const addCardPopupSelector = '.popup-add';
const avatarPopupSelector = '.popup-avatar';

const deletePopupSelector = '.popup_type_delete';
// const editAvatarPopupSelector = '.popup-edit-avatar';
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

// cоздаем экземпляр класса SECTION
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

// const cardSection = new Section((element) => {
//   cardSection.addItem(createCard(element))},
//   cardElementSelector
// );

// cardSection.renderItems(initialCards)


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '751e4ae6-349e-4ceb-83c0-e92078a56011',
    'Content-Type': 'application/json'
  }
})
 console.log(api)

const profilePopup = new PopupWithForm(profilePopupSelector, (data) => {
  // evt.preventDefault();  
  // userInfo.setUserInfo(profilePopup.getInputValues()); 
  // userInfo.setUserInfo({
  //   name: 'Имя пользователя',
  //   about: 'Профессия пользователя'
  // });
  // const inputValues = profilePopup._getInputValues();
  

  api.setUserInfo(data)
  .then(res => {
    userInfo.setUserInfo({name: res.name, profession: res.about, avatar: res.avatar })
    profilePopup.close()
  })

  .catch((error) => console.error(`Ошибка ${error}`))
  .finally(() => profilePopup.setupText())
  // userInfo.setUserInfo(inputValues);
  // if (!data.name) {
  //   data.name = 'Имя пользователя';
  // }
  // if (!data.about) {
  //   data.about = 'Профессия пользователя';
  // }
  profilePopup.close();
});




profilePopup.setEventListeners();


function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, handleCardClick, openDelete, (likeElement, cardId) => {
    if(likeElement.classList.toggle('photo-grid__button_active')){
      api.deleteLike(cardId)
      .then(res => {
        console.log(res)
        card.toggleLikes(res.likes);
       })
       .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.addLike(cardId)
      .then(res => {
        console.log(res)
        card.toggleLikes(res.likes);
       })
       .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
    }
  });
  return card.generateCard();
}

const addCardPopup = new PopupWithForm(addCardPopupSelector, (formData) => {
  // const newCardData = {
  //   // title: formData.title,
  //   name: formData.title,
  //   link: formData.link
  // };
  // const newCardElement = createCard(newCardData);
  // cardSection.addItem(newCardElement);
  Promise.all([api.getInfo(), api.addCard(formData)])
     .then(([dUser, dCard]) => {
      dCard.myid = dUser._id;
      cardSection.prependItem(createCard(dCard))
      addCardPopup.close();
     })
     .catch((error) => console.error(`Ошибка ${error}`))
     .finally(() => addCardPopup.setupText())
});

// const popupDelete = new PopupWithDeleteForm(deletePopupSelector, ({card, cardId}) => {
  
//   api.deleteCard(cardId)
//   .then(() => {
//     card.removeCardElement()
//     popupDelete.close()
//    })
//    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
//    .finally(() => popupDelete.setupText())
// });
const deletePopup = new PopupWithDeleteForm(deletePopupSelector, (card, cardId) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCardElement();
      deletePopup.close();
    })
    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
    .finally(() => deletePopup.setupText());
});

// При клике на мусорку
// deleteButton.addEventListener('click', () => {
//   deletePopup.open(card, cardId);
// });


function handleDeleteCard(cardId) {
  api.deleteCard(cardId)
        .then(() => {
            card.removeCardElement();
            popupDelete.close();
        })
        .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
        .finally(() => popupDelete.setupText());
      }



// const popupEditAvatar = new PopupWithForm(editAvatarPopupSelector, (data) => {
  
//   api.setNewAvatar(data)
//   .then(res => {
//     userInfo.setUserInfo({name: dUser.name, profession: dUser.about, avatar: dUser.avatar });
//     popupEditAvatar.close()
//    })
//    .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
//    .finally(() => popupEditAvatar.setupText())
// });

const avatarEditPopup = new PopupWithForm('.popup_type_avatar', (data) => {
  api.setNewAvatar(data.avatar)
    .then(res => {
      userInfo.setUserInfo({avatar: res.avatar});
      avatarEditPopup.close();
    })
    .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
    .finally(() => avatarEditPopup.setupText());
});

avatarEditPopup.setEventListeners();


addCardPopup.setEventListeners();

// function openDelete(card, cardId) {
//   popupDelete.open({ card, cardId });
// }

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

// const avatarForm = popupFormAvatar._formElement;
// const popupFormValidator = new FormValidator(validatorSettings, avatarForm);

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
 
// popupFormAvatar.addEventListener('click', function () { 
//   addFormValidator.resetValidation();
//   addCardPopup.open();
// });
/**Функция создания Popup редактирования аватара */
const popupFormAvatar = new PopupWithForm('.popup_type_avatar', {
  submitCallback: (data) => {
    popupFormAvatar.renderPreloader(true, 'Загрузка...')
    api.setUserAvatar(data)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser);
      popupFormAvatar.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAvatar.renderPreloader(false);
    })
  }
})



/**Функция открытия Popup аватара */
avatarOpenPopup.addEventListener('click', () => {
  // popupFormValidator.resetValidation();
  popupFormAvatar.open();
})


imagePopup.setEventListeners();
// popupFormAvatar.setEventListeners();

Promise.all([api.getInfo(), api.getCards()])
.then(([dataUser, dataCard]) => { 
  console.log(dataUser);
  dataCard.forEach(element => element.myid = dataUser._id);
 userInfo.setUserInfo({name: dataUser.name, profession: dataUser.about, avatar: dataUser.avatar })
 cardSection.renderItems(dataCard);
 console.log(dataCard);
})
.catch((error) => console.error(`Ошибка ${error}`));