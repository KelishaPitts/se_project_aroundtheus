/*
//Open Modal function
function openModal(popUp) {
  popUp.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyDown);
}

//Close Modal function
function closeModal(popUp) {
  popUp.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
}
//Close modals by pressing Escape key
const handleEscKeyDown = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
};

export { openModal, closeModal, handleEscKeyDown };
*/