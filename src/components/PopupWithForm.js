import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector },{loadingButtonText}, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton =  this._popupElement.querySelector(".modal__button-submit");
    this._loadingButtonText = loadingButtonText;
    this._buttonText = this._submitButton.textContent
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".form__input");
    const inputInfoElement = {};
    inputList.forEach((input) => {
      inputInfoElement[input.name] = input.value;
    });
    return inputInfoElement;
  }
  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
