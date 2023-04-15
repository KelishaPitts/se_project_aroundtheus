import { profileName,profileDescription } from "../utils/constants";

class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    const UserInfoElement = { name: "", job: "" };

    UserInfoElement.name = this._userName;
    UserInfoElement.job = this._userJob;
    return UserInfoElement;
  }
  setUserInfo() {
    profileName.textContent = this._userName.value;
    profileDescription.textContent = this._userJob.value;
  }
}

export default UserInfo;
