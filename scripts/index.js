const initialCards = [
  {
    name: "Yosmite Valley",
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

const popUp = document.querySelector(".modal");
const addButton = document.querySelector(".profile__button-edit");
const closeButton = popUp.querySelector(".modal__button-close");
const saveButton = popUp.querySelector(".modal__button-submit");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_aboutme");
const titleName = document.querySelector(".profile__title");
const subtitleName = document.querySelector(".profile__subtitle");
const Form = popUp.querySelector("form");

// add content
let cardList = document.querySelector(".gallery__cards");

function getCardElement(card) {
  const cardTemplate = document.querySelector("#card");
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = `Photo of ${card.name}`;

  cardTitle.textContent = card.name;

  cardList.append(cardElement);
}

function renderCards(data) {
  for (card of data) {
    getCardElement(card);
  }
}
renderCards(initialCards);

//Open Modal
function openModal() {
  popUp.classList.add("modal-modal_opened");
  nameInput.value = titleName.textContent;
  jobInput.value = subtitleName.textContent;
}
//Close Modal
function closeModal() {
  popUp.classList.remove("modal-modal_opened");
}
//Edit Profile button that opens Modal
addButton.addEventListener("click", openModal);
//Close Button on modal
closeButton.addEventListener("click", closeModal);

// Submit changes to Profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  subtitleName.textContent = jobInput.value;
}

Form.addEventListener("submit", handleProfileFormSubmit);
