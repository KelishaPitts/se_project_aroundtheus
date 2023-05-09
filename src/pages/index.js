import "../styles/index.css";
import logo from "../images/Logo-white.svg";
import {
  logoImg,
  formValidatorConfig,
  nameInput,
  jobInput,
  changeAvatarButton,
  avatarForm,
} from "../utils/constants.js";
import avatar from "../images/jacques-cousteau.jpg";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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
//avatarImg.src = avatar;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "559236c5-e398-4cbd-81f5-03b6a4d1ff9c",
});

const initialCards = api.getInitialCards().then((cards) => {
  return cards;
});

const userData = api.getUserInfo().then((userData) => {
  return userData;
});
function handleAvatarFormSubmit(data) {
  changeAvatarPopup.onLoading();

  api
    .updateAvatar(data.imageURL)
    .then(() => {
      console.log(profileUserInput.getAvatar());
      profileUserInput.setAvatar(data.imageURL);
      changeAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //loadImage(data.imageURL);
      changeAvatarPopup.endLoading("Save");
    });
}

// Submit changes to Profile Form
function handleProfileFormSubmit(data) {
  console.log(data);
  profileFormPopup.onLoading();
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
      profileFormPopup.endLoading("Save");
    });
}

// Submit changes to New Place Card Form
function handleCardFormSubmit(data) {
  placeFormPopup.onLoading();
  const cardName = data.title;
  const urlLink = data.imageURL;

  createNewCard({ name: cardName, link: urlLink });

  placeFormPopup.close();
}

function createNewCard(data) {
  api.addCard(data).then((newCard) => {
    return cardSection.renderer(newCard);
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
  placeFormPopup.createEndLoading("Create");
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
  handleAvatarFormSubmit
);

const confirmationPopup = new PopupWithConfirm({
  popupSelector: "#confirm-popup",
});

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
        console.log(card);
        console.log(data);
        confirmationPopup.open();
        confirmationPopup.submitAction(() => {
          console.log(data);
          const id = card.getId();
          api
            .deleteCard(id)
            .then((data) => {
              console.log(data);
              card.handleDeleteCard();
              confirmationPopup.close();
            })
            .catch((err) => {
              console.log(err);
            });
          confirmationPopup.close();
        });
      },
      handleCardLikes: (card) => {
        if (!card.isCardLiked()) {
          console.log(card.isCardLiked());
          console.log(card);
          console.log(card._id);
          api.addLike(card._id).then((res) => {
            card.updateLikes(res.likes);
          });
        } else {
          api.removeLike(card._id).then((res) => {
            card.updateLikes(res.likes);
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
api.getAppInfo().then(([initialCards, userData]) => {
  userId = userData._id;
  profileUserInput.setAvatar(userData.avatar);
  profileUserInput.setUserInfo(userData.name, userData.about);

  cardSection = new Section({
    renderer: (initialCards) => {
      cardSection.addItem(createCard(initialCards));
    },
    containerSelector: selectors.cardSection,
  });
  cardSection.renderItems(initialCards);
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
