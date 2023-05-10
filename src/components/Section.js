class Section {
  constructor({ renderer, containerSelector }) {
    this.renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach((this.renderer));
  }

  addItem(cardElement) {
    this._element.prepend(cardElement);
  }
}
export default Section;
