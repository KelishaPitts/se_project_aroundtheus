import "../styles/index.css";
import logo from "../images/Logo-white.svg";
const logoImg = document.querySelector('.header__logo');
logoImg.src = logo;



import avatar from "../images/jacques-cousteau.jpg";
const avatarImg = document.querySelector('.profile__image');
avatarImg.src = avatar;

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  editProfileButton,
  addCardButton,
  initialCards,
  cardForm,
  profileForm,
  nameInput,
  jobInput,
  cardTitleInput,
  placeUrlInput,
} from "../utils/constants.js";

const formValidatorConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button-submit_inactive",
  inputErrorClass: "form__input_error",
  errorClass: "form__error_active",
};

// Submit changes to Profile Form
function handleProfileFormSubmit() {
  const ProfileUserInput = new UserInfo(nameInput, jobInput);
  ProfileUserInput.setUserInfo();
  addProfileFormValidator.toggleButtonState();
  ProfileFormPopup.close();
}

// Submit changes to New Place Card Form
function handleCardFormSubmit() {
  const cardName = cardTitleInput.value;
  const urlLink = placeUrlInput.value;
  createNewCard({ name: cardName, link: urlLink });
  PlaceFormPopup.close();
  addCardFormValidator.toggleButtonState();
}

//Create new card from input

function createNewCard(data) {
  return CardSection._renderer(data);
}

editProfileButton.addEventListener("click", () => {
  ProfileFormPopup.open();
});
addCardButton.addEventListener("click", () => {
  PlaceFormPopup.open();
});

export const selectors = {
  cardSection: ".gallery__cards",
  cardTemplate: "#card",
  previewPopup: "#image-display",
};

const PlaceFormPopup = new PopupWithForm(
  { popupSelector: "#add-place-form" },
  handleCardFormSubmit
);
const ProfileFormPopup = new PopupWithForm(
  { popupSelector: "#edit-profile-form" },
  handleProfileFormSubmit
);
//Section
const CardPopupPrev = new PopupWithImage({ popupSelector: "#image-display" });

const CardSection = new Section({
  renderer: (data) => {
    const cardElement = new Card(
      {
        data,
        handleCardClick: (imageData) => {
          CardPopupPrev.open(imageData);
        },
      },
      selectors.cardTemplate
    );
    CardSection.addItem(cardElement.generateCard());
  },
  containerSelector: selectors.cardSection,
});

CardSection.renderItems(initialCards);
CardPopupPrev.setEventListeners();
PlaceFormPopup.setEventListeners();
ProfileFormPopup.setEventListeners();

//Form Validator
const addCardFormValidator = new FormValidator(formValidatorConfig, cardForm);
const addProfileFormValidator = new FormValidator(
  formValidatorConfig,
  profileForm
);
addCardFormValidator.enableValidation();
addProfileFormValidator.enableValidation();

export { addCardFormValidator, addProfileFormValidator };
