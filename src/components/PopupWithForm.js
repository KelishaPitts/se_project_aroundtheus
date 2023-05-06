import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".form__input");
    const inputInfoElement = {};
    this._inputList.forEach((input) => {
      inputInfoElement[input.name] = input.value;
    });
    return inputInfoElement;
  }

  onLoading() {
    setTimeout(this.Saving(), 5000);
  }

  endLoading(){
    this._button.textContent = this._button.name;
  }

  Saving() {
    this._button = this._popupElement.querySelector(".modal__button-submit");
    this._button.textContent = "Saving...";
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
