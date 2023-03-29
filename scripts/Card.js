import { openModal } from "./utils.js";
import { imagePopUp } from "./index.js";

const modalImage = document.querySelector(".modal__image");
const modalImageCaption = document.querySelector(".modal__image-text");

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  _setEventListeners() {
    this._cardLikeButton =
      this._cardElement.querySelector(".card__button-like");

    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__button-delete"
    );

    this._cardLikeButton.addEventListener("click", () => {
      this._likeCard();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      modalImage.src = this._link;
      modalImage.alt = `Popup photo of ${this._name}`;
      modalImageCaption.textContent = this._name;
      openModal(imagePopUp);
    });
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _likeCard() {
    this._cardLikeButton.classList.toggle("card__button-like_liked");
  }

  _getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  generateCard() {
    this._cardElement = this._getCardElement();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._cardElement;
  }
}
