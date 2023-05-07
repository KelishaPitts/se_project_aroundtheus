class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }
  //async loadCards(){
    //return await Promise.all([getInitialCards,getUserInfo, getUserAvatar,addLike,removeLike]);
  //}


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }
  getUserAvatar(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
  }

  editProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, about
        
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, link
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
}


addLike(cardId){
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: this._authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cardId
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
}

removeLike(cardId){
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: this._authToken,
      "Content-Type": "application/json",
    },
  
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
}


deleteCard(cardID) {
  return fetch(`${this._baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: {
      authorization: this._authToken,
      "Content-Type": "application/json"
    }
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
}




updateAvatar(url){
  console.log(url)
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: this._authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: url,
      
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });
}

}




  

  // other methods for working with the API

export default Api;
