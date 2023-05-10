import Popup from "./Popup.js";
class PopupWithConfirm extends Popup {
  constructor({ popupSelector },{loadingButtonText}) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._submitButton= this._popupElement.querySelector(".modal__button-confirm");
    this._loadingButtonText = loadingButtonText;
    this._buttonText = this._submitButton.textContent;
  }

  submitAction(action) {
    this._handleFormSubmit = action;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  showLoading() {
    debugger
    this._submitButton.textContent = this._loadingButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}

export default PopupWithConfirm;
