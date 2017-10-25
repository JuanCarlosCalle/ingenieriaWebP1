import { Injectable } from '@angular/core';
import { Restangular } from "ngx-restangular";
import { Observable } from "rxjs/Observable";
import { Cart } from "../models/cart";

@Injectable()
export class CartService {

  constructor(private restangular: Restangular) {}

  saveToCart(cart: Cart): Observable<string>{

    return this.restangular.all('client/addToCart').post(cart);
  }

  returnCartProducts(token: string): Observable<any> {

    return this.restangular.one('client/listCart').get({}, {'x-access-token': token});
  }
}
