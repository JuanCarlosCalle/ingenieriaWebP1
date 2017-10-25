export class Cart {
  user: Object;
  idProduct: string;

  constructor( idProduct: string) {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.idProduct = idProduct;
  }
}
