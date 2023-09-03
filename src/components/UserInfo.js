class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._aboutElement = document.querySelector(aboutSelector);
    }
  
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        profession: this._aboutElement.textContent
      };
    }
  
    setUserInfo({ name, profession}) {
      this._nameElement.textContent = name;
      this._aboutElement.textContent = profession;
    }
  }
  
  export default UserInfo;
  