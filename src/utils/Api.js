class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res){
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    }
  

  _handleErrorResponse(err){
    return console.log(err)

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((this._handleResponse))
      .catch(this._handleErrorResponse); // log the error to the console
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}
  getUserAvatar() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
      
      body: JSON.stringify({
        cardId,
      }),
    })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}

  updateAvatar(url) {
    console.log(url);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    })
    .then((this._handleResponse))
    .catch(this._handleErrorResponse); // log the error to the console
}

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

// other methods for working with the API

export default Api;
