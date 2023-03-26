import { openModal, imagePopUp } from "./utils.js";
import { renderCard } from "./index.js";

const modalImage = document.querySelector(".modal__image");
const modalImageCaption = document.querySelector(".modal__image-text");
const cardImage = document.querySelector(".card__image");

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._likeCard();
      });

    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        modalImage.src = this._link;
        modalImageCaption.textContent = this._name;
        openModal(imagePopUp);
      });
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _likeCard() {
    this._cardElement
      .querySelector(".card__button-like")
      .classList.toggle("card__button-like_liked");
  }

  _getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  addNewCard() {
    const newCardElement = this._getCardElement();
    return renderCard(newCardElement);
  }

  generateCard() {
    this._cardElement = this._getCardElement();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(
      ".card__image"
    ).alt = `Photo of ${this._name}`;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
