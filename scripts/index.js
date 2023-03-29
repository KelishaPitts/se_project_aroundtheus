import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal} from "./utils.js";
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfilePopUp = document.querySelector("#edit-profile-form");
const addPlacePopUp = document.querySelector("#add-place-form");
const imagePopUp = document.querySelector("#image-display");
const modalImageDeleteButton = imagePopUp.querySelector(".modal__button-close");
const addCardButton = document.querySelector(".profile__button-add");
const closeProfileButton = editProfilePopUp.querySelector(
  ".modal__button-close"
);
const closeCardButton = addPlacePopUp.querySelector(".modal__button-close");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_aboutme");
const cardTitleInput = document.querySelector(".form__input_type_title");
const placeUrlInput = document.querySelector(".form__input_type_imageURL");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const cardForm = addPlacePopUp.querySelector("form");
const profileForm = editProfilePopUp.querySelector("form");



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
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//cards in gallery container
const cardList = document.querySelector(".gallery__cards");

//Add card to gallery card container

function renderCard(cardElement) {
  cardList.prepend(cardElement);
}

//Render an array of cards from an array of card information
function renderCards(data) {
  data.forEach((item) => {
    return createNewCard(item.name, item.link);
  });
}
//Create new card from input
function createNewCard(name, link) {
  const newCard = new Card({ name, link }, "#card").generateCard();
  return renderCard(newCard);
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

//Fill profle input fields with Name and Job title values
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

//Open Profile popup with filled in fields.
function openEditProfileModal() {
  // fill profile form using  fillProfileForm
  fillProfileForm();
  openModal(editProfilePopUp);
}

//Edit Profile button that opens Profile Modal
editProfileButton.addEventListener("mousedown", openEditProfileModal);

// Add Card Button that opens Add Card Modal
addCardButton.addEventListener("mousedown", () => {
  openModal(addPlacePopUp);
});

const popups = document.querySelectorAll('.modal');

const closePopUps= (popups) => popups.forEach((popup) => 
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('modal_opened')) {
            closeModal(popup);
        }
          if (evt.target.classList.contains('modal__button-close')) {
            closeModal(popup);
          }
        })
    )

closePopUps(popups);

// Submit changes to Profile Form
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopUp);
}

// Submit changes to New Place Card Form
function handleCardFormSubmit(event) {
  event.preventDefault();
  const cardName = cardTitleInput.value;
  const urlLink = placeUrlInput.value;
  createNewCard(cardName, urlLink);

  closeModal(addPlacePopUp);
  cardForm.reset();
  addCardFormValidator.toggleButtonState(); 
  
}

//Submit profile form input informatiom
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Submit Card form input informatiom
cardForm.addEventListener("submit", handleCardFormSubmit);


//
const addCardFormValidator = new FormValidator(formValidatorConfig, cardForm);
const addProfileFormValidator = new FormValidator(
  formValidatorConfig,
  profileForm
);
addCardFormValidator.enableValidation();
addProfileFormValidator.enableValidation();

export {
  renderCard,
  renderCards,
  createNewCard,
  addCardFormValidator,
  addProfileFormValidator,
  imagePopUp
};
