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

