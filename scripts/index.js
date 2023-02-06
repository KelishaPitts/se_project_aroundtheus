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
let popUp = document.querySelector(".modal");

function openModal(){
popUp.classList.add("modal-modal_opened");
}
function closeModal(){
popUp.classList.remove("modal-modal_opened");
}

addButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);