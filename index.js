const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');


function openPopup() {
    alert("Вазааап");
    // console.log('openPopup');
    popupElement.classList.add('popup_opened');
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