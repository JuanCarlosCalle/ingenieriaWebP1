import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {Observable} from 'rxjs/Observable';
import {Product} from '../models/product';
import {Http, Response} from '@angular/http';


@Injectable()
export class ProductService {

  constructor(private  restangular: Restangular,
              private http: Http) {
  }

  getProducts(): Observable<Object[]> {

    return this.restangular.all('shop/listProducts').getList();
  }

  postImage(file: File): Observable<string> {

    let formData = new FormData();
    formData.append('photo', file);

    let URL = 'http://localhost:4200/shop/postImage';

    return this.http.post(URL, formData).map((res: Response) => res.json().route);
  }

  saveProduct(product: Product): Observable<string> {

    return this.restangular.all('shop/addProduct').post(product);
  }

  getProductsByVendor(token: string): Observable<Object[]> {

    return this.restangular.all('shop/listProductsByVendor').getList({}, {'x-access-token': token})
  }
}
