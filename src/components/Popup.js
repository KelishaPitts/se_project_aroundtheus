export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
        document.removeEventListener("keydown", this._handleEscClose);
      }
      if (evt.target.classList.contains("modal__button-close")) {
        this.close();
        document.removeEventListener("keydown", this._handleEscClose);
      }
    });
  }
}
