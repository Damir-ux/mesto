const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const profileTitleNode = document.querySelector('.profile__title');
const profileSubtitleNode = document.querySelector('.profile__subtitle');


function openPopup() {
    // console.log('openPopup');
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitleNode.textContent.trim();
    jobInput.value = profileSubtitleNode.textContent.trim();
}

function setNodeTextValue(){
    profileTitleNode.textContent = nameInput.value;
    profileSubtitleNode.textContent = jobInput.value;
}


function closePopup() {
//     console.log('closePopup');
     popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);



let formElement = document.querySelector(".popup__form");


// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_profession");



function handleFormSubmit (evt) {      
    evt.preventDefault();
    setNodeTextValue();
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// 1. Загружаем карточки на страницу с помощью Java Script



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
      }
  ];

  const photoGrid = document.querySelector('.photo-grid');

  initialCards.forEach(function(card) {
      const cardElement = createCardElement(card);
      photoGrid.appendChild(cardElement);
  });

  function createCardElement(card) {
      const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
      const cardImage = cardTemplate.querySelector('.photo-grid__image');
      const cardText = cardTemplate.querySelector('.photo-grid__text');

      cardImage.src = card.link;
      cardImage.alt = card.name;
      cardText.textContent = card.name;

      return cardTemplate;
  };


// 2. Форма добавления карточки

document.addEventListener('DOMContentLoaded', function() {
  const photoGrid = document.querySelector('.photo-grid');
  const addForm = document.forms['add-form'];
  const titleInput = addForm.elements['title'];
  const linkInput = addForm.elements['link'];

  addForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = titleInput.value;
    const link = linkInput.value;

    if (title && link) {
      const newCardHTML = `
        <div class="photo-grid__item">
          <button class="photo-grid__trash" type="button"></button>
          <img src="${link}" alt="${title}" class="photo-grid__image">
          <div class="photo-grid__signature">
            <h2 class="photo-grid__text">${title}</h2>
            <button class="photo-grid__button" type="button"></button>
          </div>
        </div>
      `;

      photoGrid.insertAdjacentHTML('beforeend', newCardHTML);

      titleInput.value = '';
      linkInput.value = '';
    }
  });
});



const popupAddButtonElement = document.querySelector('.profile__button-add');
const popupCloseAddElement = document.querySelector('.popup__close_add');
const photoGridTextNode = document.querySelector('.photo-grid__text');
const photoGridimageNode = document.querySelector('.photo-grid__image');
const popupAddElement = document.querySelector('.popup-add');

function openAdd() {
    popupAddElement.classList.add('popup_opened');
    textInput.value = photoGridTextNode.textContent.trim();
    imageInput.value = photoGridimageNode.textContent.trim();
}

function closeAdd() {
    popupAddElement.classList.remove('popup_opened');
}

popupAddButtonElement.addEventListener('click', openAdd);
popupCloseAddElement.addEventListener('click', closeAdd);



// Находим поля формы в DOM
let textInput = document.querySelector(".popup__input_title");
let imageInput = document.querySelector(".popup__input_link");

let formElement2 = document.querySelector(".popup__form_add");

function AddFormSubmit (evt) {      
    evt.preventDefault();
    
    closeAdd();
}

formElement2.addEventListener('submit', AddFormSubmit);


// 3. Лайки

const like = document.querySelectorAll('.photo-grid__button');
like.forEach(function(el) {
  el.addEventListener('click', function(evt) {
      evt.target.classList.toggle('photo-grid__button_active');
  });
});

// 4.Удаление карточки

const deleteButton = document.querySelector('.photo-grid');

deleteButton.addEventListener('click', function(event) {

  if(event.target.classList.contains('photo-grid__trash'))
  {
  const listItem = event.target.closest('.photo-grid__item');
     if(listItem){
        listItem.remove();
      }
  }
});

// 5.Открытие попапа с картинкой


  const photoGridItems = document.querySelectorAll('.photo-grid__item');
  const popupCards = document.querySelector('.popup__cards');
  const popupPhoto = document.querySelector('.popup__photo');
  const popupPhotoCap = document.querySelector('.popup__photo-cap');
  const popupCloseCards = document.querySelector('.popup__close_cards');

  photoGridItems.forEach(item => {
    item.addEventListener('click', function() {
      const imageSrc = this.querySelector('.photo-grid__image').getAttribute('src');
      const imageAlt = this.querySelector('.photo-grid__text').textContent;

      popupPhoto.setAttribute('src', imageSrc);
      popupPhoto.setAttribute('alt', imageAlt);
      popupPhotoCap.textContent = imageAlt;
      popupCards.classList.add('popup_opened');
    });
  });

  popupCloseCards.addEventListener('click', function() {
    popupCards.classList.remove('popup_opened');
  });








