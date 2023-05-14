const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
const profileTitleNode = document.querySelector('.profile__title');
const profileSubtitleNode = document.querySelector('.profile__subtitle');

// let $like = document.querySelector('.photo-grid__button');
// $like.addEventListener( 'click', () => 
// $like.classList.toggle('photo-grid__button_active') )


function openPopup() {
    // console.log('openPopup');
    popupElement.classList.add('popup_opened');
}

function setPopupInputValue(){
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


// const closePopupByClickOnOverlay = function (event) {
//     if (event.target !== event.currentTarget) return;

//     closePopup();
// }


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
// popupElement.addEventListener('click', closePopupByClickOnOverlay)

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

