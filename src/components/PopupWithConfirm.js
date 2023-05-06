import Popup from "./Popup.js";
class PopupWithConfirm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__container");
  }

  submitAction(action){
    this._handleFormSubmit = action;
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