import "../styles/index.css";
import logo from "../images/Logo-white.svg";
import { logoImg, avatarImg,formValidatorConfig, nameInput, jobInput } from "../utils/constants.js";
import avatar from "../images/jacques-cousteau.jpg";
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
  selectors
} from "../utils/constants.js";
logoImg.src = logo;
avatarImg.src = avatar;

// Submit changes to Profile Form
function handleProfileFormSubmit(data) {
  profileUserInput.setUserInfo(data.fullname, data.aboutme);
  addProfileFormValidator.disableButton();
  profileFormPopup.close();
}

// Submit changes to New Place Card Form
function handleCardFormSubmit(data) {
  const cardName = data.title; 
  const urlLink = data.imageURL; 
  createNewCard({name: cardName, link: urlLink});
  placeFormPopup.close();
  addCardFormValidator.disableButton();
}

//Create new card from input

function createNewCard(data) {
  return cardSection.renderer(data);
}

editProfileButton.addEventListener("click", () => {
profileFormPopup.open( profileUserInput.getUserInfo());
});
addCardButton.addEventListener("click", () => {
  placeFormPopup.open();
});


const profileUserInput = new UserInfo(nameInput, jobInput);

const placeFormPopup = new PopupWithForm(
  { popupSelector: "#add-place-form" },
  handleCardFormSubmit
);
const profileFormPopup = new PopupWithForm(
  { popupSelector: "#edit-profile-form" },
  handleProfileFormSubmit
);
//Section
const cardPopupPrev = new PopupWithImage({ popupSelector: "#image-display" });


function createCard(data) {
  const cardElement = new Card(
    {
      data,
      handleCardClick: (imageData) => {
        cardPopupPrev.open(imageData);
      },
    },
    selectors.cardTemplate
  );
return cardElement
}


const cardSection = new Section({
  renderer: (data) => { 
    const cardElement = createCard(data)
    cardSection.addItem(cardElement.generateCard());
  },
  containerSelector: selectors.cardSection,
});

cardSection.renderItems(initialCards);
cardPopupPrev.setEventListeners();
placeFormPopup.setEventListeners();
profileFormPopup.setEventListeners();

//Form Validator
const addCardFormValidator = new FormValidator(formValidatorConfig, cardForm);
const addProfileFormValidator = new FormValidator(
  formValidatorConfig,
  profileForm
);

addCardFormValidator.enableValidation();
addProfileFormValidator.enableValidation();
addCardFormValidator.resetValidation();
addProfileFormValidator.resetValidation();

export { addCardFormValidator, addProfileFormValidator };
