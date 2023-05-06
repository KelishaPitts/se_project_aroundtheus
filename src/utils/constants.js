const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfilePopUp = document.querySelector("#edit-profile-form");
const addPlacePopUp = document.querySelector("#add-place-form");
const changeAvatarPopup = document.querySelector("#change-avatar");
const imagePopUp = document.querySelector("#image-display");
const changeAvatarButton = document.querySelector(".profile__button-avatar");
const addCardButton = document.querySelector(".profile__button-add");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_aboutMe");
const cardTitleInput = document.querySelector(".form__input_type_title");
const placeUrlInput = document.querySelector(".form__input_type_imageURL");
const avatarForm = changeAvatarPopup.querySelector("form");
const cardForm = addPlacePopUp.querySelector("form");

const profileForm = editProfilePopUp.querySelector("form");
const logoImg = document.querySelector('.header__logo');
const avatarImg = document.querySelector('.profile__image');
//cards in gallery container
const cardList = document.querySelector(".gallery__cards");

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
    userJobSelector: ".profile__subtitle",
    userAvatarSelector:".profile__image"
  };

  export {editProfileButton,editProfilePopUp,addPlacePopUp,imagePopUp,addCardButton,nameInput,jobInput,changeAvatarPopup ,cardTitleInput,avatarForm,changeAvatarButton,
         placeUrlInput,cardForm,profileForm,cardList, profileDescription,profileName,logoImg,avatarImg,formValidatorConfig, selectors,userInfoSelectors};