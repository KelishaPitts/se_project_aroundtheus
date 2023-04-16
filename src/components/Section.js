class Section {
  constructor({ renderer, containerSelector }) {
    this.renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(cardElement) {
    this._element.prepend(cardElement);
  }
}
export default Section;
