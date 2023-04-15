import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
  }

  getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".form__input");
    const inputInfoElement = {};
    inputList.forEach((input) => {
      inputInfoElement[input.name] = input.value;
    });
    return inputInfoElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
