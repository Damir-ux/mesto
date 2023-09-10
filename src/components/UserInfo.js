class UserInfo {
    constructor({ nameSelector, aboutSelector, profileSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._aboutElement = document.querySelector(aboutSelector);
      this._profileAvatar = document.querySelector(profileSelector);
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        profession: this._aboutElement.textContent
      };
    }
  
    setUserInfo({ name, profession, avatar}) {
      this._profileAvatar.src = avatar;
      this._nameElement.textContent = name;
      this._aboutElement.textContent = profession;
    }
  }
  
  export default UserInfo;
  