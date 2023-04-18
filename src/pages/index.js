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
  selectors,
  userInfoSelectors
} from "../utils/constants.js";
logoImg.src = logo;
avatarImg.src = avatar;



// Submit changes to Profile Form
function handleProfileFormSubmit(data) {
  profileUserInput.setUserInfo(data.fullname, data.aboutMe);
  profileFormPopup.close();
}

// Submit changes to New Place Card Form
function handleCardFormSubmit(data) {
  const cardName = data.title; 
  const urlLink = data.imageURL; 
  createNewCard({name: cardName, link: urlLink});
  placeFormPopup.close();
}

//Create new card from input

function createNewCard(data) {
  return cardSection.renderer(data);
}

editProfileButton.addEventListener("click", () => {
profileFormPopup.open();
addProfileFormValidator.disableButton();
const userData = profileUserInput.getUserInfo();
console.log(profileUserInput.getUserInfo());
nameInput.value = userData.name;
jobInput.value = userData.job;

});
addCardButton.addEventListener("click", () => {
  placeFormPopup.open();
  addCardFormValidator.disableButton();
  
});


const profileUserInput = new UserInfo(userInfoSelectors.userNameSelector, userInfoSelectors.userJobSelector);

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
  ).generateCard();
return cardElement
}


const cardSection = new Section({
  renderer: (data) => { 
    const cardElement = createCard(data)
    cardSection.addItem(cardElement);
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
