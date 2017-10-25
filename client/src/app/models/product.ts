export class Product {

  user: Object;
  content: Content;

  constructor(content: Content) {
    this.content = content;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}

class Content {
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}
