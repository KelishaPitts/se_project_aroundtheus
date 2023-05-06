export default class Card {
  constructor({data, handleCardClick, handleDeleteCardClick,handleCardLikes }, cardSelector) {
    this._name = data.name;
    this._userId = data.userId;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._id = data.id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleCardLikes = handleCardLikes;
    this._cardOwnerId = data.owner_id;
    
    
  }
  getId(){
    
    return this._id;
  }



  isButtonLiked(){
    if (this._cardLikeButton.classList.contians("card__button-like_liked")){
      return true;
    }else{
      return false;
    }
  }

  isCardLiked(){
    return this._likes.some((like)=>like.id === this._userId);
  }

updateLikes(likes){
 this._likes = likes;
 this.showLikes();
}

 showLikes(){
  this._cardElement.querySelector(".card__like-counter").textContent = this._likes.length;
}

  _setEventListeners() {
    this._cardLikeButton =
      this._cardElement.querySelector(".card__button-like");

    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__button-delete"
    );

    this._cardLikeButton.addEventListener("click", () => {
     this._likeCard();
     this._handleCardLikes( this._id
     );
    
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCardClick({_id: this._cardOwnerId});
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ link: this._link, name: this._name });
    });
  }

  handleDeleteCard =()=>{
    this._cardElement.remove();
    this._cardElement = null;
  }

 _canDelete(){
  if (this._userId !== this._cardOwnerId){
    this._cardDeleteButton.remove();
  }

 }

  _likeCard() {  
  this._cardLikeButton.classList.toggle("card__button-like_liked");
}

  _getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  generateCard() {
    this._cardElement = this._getCardElement();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = `Photo of ${this._name}`;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this.showLikes();
    //this._canDelete();
    return this._cardElement;
  } 
}
