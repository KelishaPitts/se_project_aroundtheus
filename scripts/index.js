const initialCards = [
    Yosmite = {
        name: "Yosmite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    Louise = {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    Bald = {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    Latemar = {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    Vanoise = {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    Lago = {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
];

let addButton = document.querySelector(".profile__button-edit");
let closeButton = document.querySelector(".modal__button-close");
let saveButton = document.querySelector(".modal__button-submit");
let popUp = document.querySelector(".modal");
const nameInput= document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_aboutme");
let titleName = document.querySelector(".profile__title");
let subtitleName = document.querySelector(".profile__subtitle");



// add content
let cardList = document.querySelector(".gallery__cards");



function getCardElement(data){
    for (card of data){ 
    let cardTemplate = document.querySelector("#card");
    let cardElement = cardTemplate.content.cloneNode(true);
    let cardImage = cardElement.querySelector(".card__image");
    let cardTitle = cardElement.querySelector(".card__title"); 
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    
    cardList.append(cardElement);
    }
}


getCardElement(initialCards);

//Open Modal
function openModal(){
popUp.classList.add("modal-modal_opened");
nameInput.value = titleName.textContent;
jobInput.value= subtitleName.textContent;

}
//Close Modal
function closeModal(){
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
popUp.addEventListener('submit', handleProfileFormSubmit); 



