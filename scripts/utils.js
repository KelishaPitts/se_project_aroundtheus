import { createNewCard } from "./index.js";
import { addCardFormValidator } from "./index.js";
const modal = document.querySelector(".modal");
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
const saveButton = document.querySelector(".modal__button-submit");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_aboutme");
const cardTitleInput = document.querySelector(".form__input_type_title");
const placeUrlInput = document.querySelector(".form__input_type_imageURL");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const cardForm = addPlacePopUp.querySelector("form");
const profileForm = editProfilePopUp.querySelector("form");

//Open Modal function
function openModal(popUp) {
  popUp.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyDown);
}

//Close Modal function
function closeModal(popUp) {
  popUp.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
}

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
editProfileButton.addEventListener("click", openEditProfileModal);

// Add Card Button that opens Add Card Modal
addCardButton.addEventListener("click", () => {
  openModal(addPlacePopUp);
});

//Close Button on Edit Profile Modal
closeProfileButton.addEventListener("click", () => {
  closeModal(editProfilePopUp);
});

// Close Button on Image Modal
modalImageDeleteButton.addEventListener("click", () => {
  closeModal(imagePopUp);
});

//Close Button on add Card Profile Modal
closeCardButton.addEventListener("click", () => {
  closeModal(addPlacePopUp);
});

//Close modal by clicking outside of modal
const clickOffPopUP = (modalElement) => {
  modalElement.addEventListener("mousedown", function (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(modalElement);
    }
  });
};

//Close modal by clicking outside of image modal
clickOffPopUP(imagePopUp);

//Close modal by clicking outside of edit profile modal
clickOffPopUP(editProfilePopUp);

//Close modal by clicking outside of add card modal
clickOffPopUP(addPlacePopUp);

//Close modals by pressing Escape key
const handleEscKeyDown = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
};

// Submit changes to Profile Form
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopUp);
  profileForm.reset();
}

// Submit changes to New Place Card Form
function handleCardFormSubmit(event) {
  event.preventDefault();
  const cardInputList = Array.from(cardForm.querySelectorAll(".form__input"));
  const cardSaveButton = cardForm.querySelector(".modal__button-submit");
  const cardName = cardTitleInput.value;
  const urlLink = placeUrlInput.value;

  createNewCard(cardName, urlLink);

  closeModal(addPlacePopUp);
  cardForm.reset();
  addCardFormValidator.toggleButtonState(cardInputList, cardSaveButton);
}

//Submit profile form input informatiom
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Submit Card form input informatiom
cardForm.addEventListener("submit", handleCardFormSubmit);

export {
  modal,
  editProfileButton,
  editProfilePopUp,
  imagePopUp,
  addPlacePopUp,
  modalImageDeleteButton,
  addCardButton,
  closeProfileButton,
  closeCardButton,
  saveButton,
  nameInput,
  jobInput,
  cardTitleInput,
  placeUrlInput,
  profileName,
  profileDescription,
  cardForm,
  profileForm,
  openModal,
  closeModal,
  fillProfileForm,
  openEditProfileModal,
  clickOffPopUP,
  handleEscKeyDown,
  handleProfileFormSubmit,
  handleCardFormSubmit,
};
