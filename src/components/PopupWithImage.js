import Popup from "./Popup";
class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__image-text");
  }
  open(data) {
    this._image.src = data.link;
    this._image.alt = `Popup photo of ${data.name}`;
    this._caption.textContent = data.name;
    super.open();
  }
}
export default PopupWithImage;
