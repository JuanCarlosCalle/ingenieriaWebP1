export class CouponList {

  user: Object;
  clients: any[];

  constructor(content: string[]) {
    this.clients = content;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}

