require('dotenv').config({ path: require('../../.env')('.env')});

import "../pages/index.css";
import logo from "../images/Logo-white.svg";
import {
  logoImg,
  formValidatorConfig,
  nameInput,
  jobInput,
  changeAvatarButton,
  avatarForm,
} from "../utils/constants.js";
//import avatar from "../images/jacques-cousteau.jpg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api";

import {
  editProfileButton,
  addCardButton,
  cardForm,
  profileForm,
  selectors,
  userInfoSelectors,
} from "../utils/constants.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
logoImg.src = logo;
const apikey = process.env.API_KEY;
console.log(process.env.API_KEY)
//avatarImg.src = avatar;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "~" ,
    "Content-Type": "application/json",
  },
});
function handleAvatarFormSubmit(data) {
  changeAvatarPopup.showLoading();

  api
    .updateAvatar(data.imageURL)
    .then(() => {
      profileUserInput.setAvatar(data.imageURL);
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //loadImage(data.imageURL);
      changeAvatarPopup.hideLoading();
    });
}

// Submit changes to Profile Form
function handleProfileFormSubmit(data) {
  profileFormPopup.showLoading();
  api
    .editProfile({ name: data.fullname, about: data.aboutMe })
    .then(() => {
      console.log(data.fullname);
      profileUserInput.setUserInfo(data.fullname, data.aboutMe, data.avatar);
      console.log(data);

      profileFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileFormPopup.hideLoading();
    });
}

// Submit changes to New Place Card Form
function handleCardFormSubmit(data) {
  placeFormPopup.showLoading();
  const cardName = data.title;
  const urlLink = data.imageURL;

  createNewCard({ name: cardName, link: urlLink });
}

function createNewCard(data) {
  api
    .addCard(data)
    .then((newCard) => {
      placeFormPopup.close();
      return cardSection.addItem(createCard(newCard));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      placeFormPopup.hideLoading();
    });
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

changeAvatarButton.addEventListener("click", () => {
  changeAvatarPopup.open();
  addAvatarFormValidator.disableButton();
});

const profileUserInput = new UserInfo(
  userInfoSelectors.userNameSelector,
  userInfoSelectors.userJobSelector,
  userInfoSelectors.userAvatarSelector
);

const changeAvatarPopup = new PopupWithForm(
  { popupSelector: "#change-avatar" },
  { loadingButtonText: "Saving..." },

  handleAvatarFormSubmit
);

const confirmationPopup = new PopupWithConfirm(
  {
    popupSelector: "#confirm-popup",
  },
  { loadingButtonText: "Deleting.." }
);

const placeFormPopup = new PopupWithForm(
  { popupSelector: "#add-place-form" },
  { loadingButtonText: "Saving..." },

  handleCardFormSubmit
);

const profileFormPopup = new PopupWithForm(
  { popupSelector: "#edit-profile-form" },
  { loadingButtonText: "Saving..." },

  handleProfileFormSubmit
);
//Section
const cardPopupPrev = new PopupWithImage({ popupSelector: "#image-display" });

function createCard(data) {
  const cardElement = new Card(
    {
      data: {
        link: data.link,
        name: data.name,
        id: data._id,
        likes: data.likes,
        cardOwnerId: data.owner._id,
      },
      userId,

      handleCardClick: (imageData) => {
        console.log(userId);
        cardPopupPrev.open(imageData);
      },

      handleDeleteCardClick: (card) => {
        confirmationPopup.open();
        confirmationPopup.setSubmitAction(() => {
          const id = card.getId();
          confirmationPopup.showLoading();
          api
            .deleteCard(id)
            .then(() => {
              card.handleDeleteCard();
              confirmationPopup.close();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              confirmationPopup.hideLoading();
            });
        });
      },
      handleCardLikes: (card) => {
        if (!card.isCardLiked()) {
          api
            .addLike(card._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .removeLike(card._id)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },

    selectors.cardTemplate
  ).generateCard();

  return cardElement;
}

let cardSection;
let userId;
api
  .getAppInfo()
  .then(([card, userData]) => {
    userId = userData._id;
    profileUserInput.setAvatar(userData.avatar);
    profileUserInput.setUserInfo(userData.name, userData.about);

    cardSection = new Section({
      renderer: (card) => {
        cardSection.addItem(createCard(card));
      },
      containerSelector: selectors.cardSection,
    });
    cardSection.renderItems(card);
  })
  .catch((err) => {
    console.log(err);
  });

cardPopupPrev.setEventListeners();
placeFormPopup.setEventListeners();
profileFormPopup.setEventListeners();
changeAvatarPopup.setEventListeners();
confirmationPopup.setEventListeners();

//Form Validator
const addCardFormValidator = new FormValidator(formValidatorConfig, cardForm);
const addAvatarFormValidator = new FormValidator(
  formValidatorConfig,
  avatarForm
);
const addProfileFormValidator = new FormValidator(
  formValidatorConfig,
  profileForm
);

addCardFormValidator.enableValidation();
addProfileFormValidator.enableValidation();
addAvatarFormValidator.enableValidation();
addAvatarFormValidator.resetValidation();
addCardFormValidator.resetValidation();
addProfileFormValidator.resetValidation();

export {
  addCardFormValidator,
  addProfileFormValidator,
  addAvatarFormValidator,
};
