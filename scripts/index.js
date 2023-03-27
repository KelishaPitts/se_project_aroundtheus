import Card from "./Card.js";
import {modal,editProfileButton,editProfilePopUp,addPlacePopUp,modalImageDeleteButton,addCardButton,closeProfileButton,closeCardButton
  ,saveButton, nameInput, jobInput, cardTitleInput, placeUrlInput, profileName, profileDescription, cardForm, profileForm,
  openModal,closeModal, fillProfileForm, openEditProfileModal, clickOffPopUP,handleEscKeyDown,handleProfileFormSubmit, 
  handleCardFormSubmit } from "./utils.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"

}




//cards in gallery container
const cardList = document.querySelector(".gallery__cards");
const formElement = editProfilePopUp.querySelector("form");


//Add card to gallery card container

function renderCard(cardElement) {
  cardList.prepend(cardElement);
}

//Render an array of cards from an array of card information
function renderCards(data) { 
  data.forEach((item) => { 
    const card = new Card(item, '#card').generateCard(); 
    renderCard(card); 
  }); 

} 
//Create new card from input
function createNewCard(name,link){
  const newCard = new Card({name, link}, '#card').generateCard();
  return renderCard(newCard)

}


//Renders cards from an array and place them in gallery cards contianer.
renderCards(initialCards);


const formValidatorConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button-submit_inactive",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
};

const addformValidator = new FormValidator(formValidatorConfig, formElement);
addformValidator.enableValidation();
 
export{renderCard, renderCards,createNewCard};
  

