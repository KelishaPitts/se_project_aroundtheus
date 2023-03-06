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

const modal = document.querySelector(".modal");
const editProfilePopUp = document.querySelector("#edit-profile-form");
const imagePopUp = document.querySelector("#image-display");
const addPlacePopUp = document.querySelector("#add-place-form");
const editProfileButton = document.querySelector(".profile__button-edit");
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
const cardTemplate = document.querySelector("#card");
const modalImageDeleteButton = imagePopUp.querySelector(".modal__button-close");

//cards in gallery container
const cardList = document.querySelector(".gallery__cards");

//Clone card from template
function getCardElement(card) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = `Photo of ${card.name}`;
  cardTitle.textContent = card.name;

  //Card like button
  const cardLikeButton = cardElement.querySelector(".card__button-like");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__button-like_liked");
  });

  //Card delete button
  const deleteCardButton = cardElement.querySelector(".card__button-delete");
  deleteCardButton.addEventListener("click", removeCard);

  //Card image popup
  cardImage.addEventListener("click", () => {
    const modalImage = document.querySelector(".modal__image");
    const modalImageCaption = document.querySelector(".modal__image-text");

    //Image popup delete button
    modalImage.src = cardImage.src;
    modalImageCaption.textContent = card.name;
    openModal(imagePopUp);
  });
  return cardElement;
}
//Add card to gallery card container
function renderCard(cardElement) {
  cardList.prepend(cardElement);
}

//Render an array of cards from an array of card information
function renderCards(data) {
  data.forEach((card) => {
    const cardElement = getCardElement(card);
    renderCard(cardElement);
  });
}

//Renders cards from an array and place them in gallery cards contianer.
renderCards(initialCards);

//Declares delete card button after cards are rendered.
const deleteCardButton = document.querySelector(".card__button-delete");

//Open Modal function
function openModal(popUp) {
  popUp.classList.add("modal_opened");
}

//Close Modal function
function closeModal(popUp) {
  popUp.classList.remove("modal_opened");
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
  const cardName = cardTitleInput.value;
  const urlLink = placeUrlInput.value;
  newCard = { name: cardName, link: urlLink };
  addNewCard(newCard);
  closeModal(addPlacePopUp);
  cardForm.reset();
}

//Creates a new card from Form input
function addNewCard(newCard) {
  const newCardElement = getCardElement(newCard);
  renderCard(newCardElement);
}

//Removes Card
function removeCard(e) {
  e.target.parentNode.remove(".card");
}

//Valdiate Forms
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__error-field");
  inputElement.classList.add("form__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__error-field");
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");

  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button-submit_inactive");
  } else {
    buttonElement.classList.remove("modal__button-submit_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".modal__button-submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(".form__fieldset")
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};




document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    console.log("hi");
    modalList = Array.from(document.querySelectorAll(".modal"));
    modalList.forEach((modalElement) => {
      console.log("print")
      closeModal(modalElement);
    });
  }

  
}, false

);

//Submit profile form input informatiom
profileForm.addEventListener("submit", handleProfileFormSubmit);

//Submit Card form input informatiom
cardForm.addEventListener("submit", handleCardFormSubmit);
