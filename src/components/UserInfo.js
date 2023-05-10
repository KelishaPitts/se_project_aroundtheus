class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileDescription = document.querySelector(userJobSelector);
    this._profileAvatar = document.querySelector(userAvatarSelector);
  }

  getAvatar() {
    return this._profileAvatar.src;
  }

  setAvatar(link) {
    this._profileAvatar.src = link;
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._profileName.textContent;
    userData.job = this._profileDescription.textContent;
    return userData; // here you return the collected data
  }

  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = job;
  }
}

export default UserInfo;
