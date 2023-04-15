class Section {
  constructor({ renderer, containerSelector }) {
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardElement) {
    this._element.prepend(cardElement);
  }
}
export default Section;
