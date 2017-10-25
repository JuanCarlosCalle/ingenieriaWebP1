export class UserToken {
  user: string;
  role: string;
  token: string;

  constructor(user: string,  role: string, token: string) {
    this.user = user;
    this.role = role;
    this.token = token;
  }

  setLocalStorage() {
    localStorage.setItem('currentUser', JSON.stringify({
      user: this.user,
      role: this.role,
      token: this.token
    }));
  }
}
