import Popup from "./Popup.js";
class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__container");
  }

setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt)=>{
        evt.preventDefault();
        this._handleFormSubmit();

    })
}


}

export default PopupWithConfirm;