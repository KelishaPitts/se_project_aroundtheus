export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
  }
 


  _showInputError(inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validity.valid;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = inputElement.validity.valid;
    errorElement.classList.remove(this._errorClass);

  }

  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }

  }

  _hasInvalidInput(inputList){
    inputList.some((inputElement) => !inputElement.validity.valid);
  }
  _enableButton (buttonElement){
  buttonElement.classList.remove(this._inactiveButtonClass);
  buttonElement.disabled = false;

  }
  _disableButton (buttonElement){
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }
  
  toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
}

_setEventListeners(){
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  this.toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      this._checkInputValidity(inputElement);
      this.toggleButtonState(inputList, buttonElement);
    });
  });
}  


  enableValidation() {
    this._formElement.addEventListener("submit", (evt)=> {
      evt.preventDefault();
    });

    
    
    this._setEventListeners();
  }
}

// enabling validation by calling enableValidation()
// pass all the settings on call



