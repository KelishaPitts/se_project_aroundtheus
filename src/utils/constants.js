const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfilePopUp = document.querySelector("#edit-profile-form");
const addPlacePopUp = document.querySelector("#add-place-form");
const imagePopUp = document.querySelector("#image-display");
const addCardButton = document.querySelector(".profile__button-add");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_aboutMe");
const cardTitleInput = document.querySelector(".form__input_type_title");
const placeUrlInput = document.querySelector(".form__input_type_imageURL");
const cardForm = addPlacePopUp.querySelector("form");
const profileForm = editProfilePopUp.querySelector("form");
const logoImg = document.querySelector('.header__logo');
const avatarImg = document.querySelector('.profile__image');
//cards in gallery container
const cardList = document.querySelector(".gallery__cards");

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

  const formValidatorConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".modal__button-submit",
    inactiveButtonClass: "modal__button-submit_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__error_active",
  };
  const selectors = {
    cardSection: ".gallery__cards",
    cardTemplate: "#card",
    previewPopup: "#image-display",

  };

  const userInfoSelectors ={
    userNameSelector:".profile__title",
    userJobSelector: ".profile__subtitle"
  };

  export {editProfileButton,editProfilePopUp,addPlacePopUp,imagePopUp,addCardButton,nameInput,jobInput,cardTitleInput,
         placeUrlInput,cardForm,profileForm,cardList,initialCards, profileDescription,profileName,logoImg,avatarImg,formValidatorConfig, selectors,userInfoSelectors};