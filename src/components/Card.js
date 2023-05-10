export default class Card {
  constructor(
    { data, userId, handleCardClick, handleDeleteCardClick, handleCardLikes },
    cardSelector
  ) {
    this._name = data.name;
    this._userId = userId;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._id = data.id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleCardLikes = handleCardLikes;
    this._cardOwnerId = data.cardOwnerId;
  }
  getId() {
    return this._id;
  }

  isCardLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._cardCounter.textContent = this._likes.length;
    this.toggleLikeButton();
  }

  _setEventListeners() {
    this._cardLikeButton =
      this._cardElement.querySelector(".card__button-like");

    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__button-delete"
    );

    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLikes(this);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCardClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ link: this._link, name: this._name });
    });
  }

  handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _hideTrashButton() {
    if (this._userId !== this._cardOwnerId) {
      this._cardDeleteButton.remove();
    }
  }

  toggleLikeButton() {
    if (this.isCardLiked()) {
      this._cardLikeButton.classList.add("card__button-like_liked");
    } else {
      this._cardLikeButton.classList.remove("card__button-like_liked");
    }
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
    this._cardCounter = this._cardElement.querySelector(".card__like-counter");
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this.renderLikes();
    this._hideTrashButton();
    return this._cardElement;
  }
}
