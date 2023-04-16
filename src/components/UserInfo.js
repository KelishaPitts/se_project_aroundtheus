import { profileName,profileDescription } from "../utils/constants";

class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
    this._profileName = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
    this._userName.value = this._profileName.textContent;
    this._userJob.value = this._profileDescription.textContent;
  }
  setUserInfo(name,job) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = job;
  }
}

export default UserInfo;
