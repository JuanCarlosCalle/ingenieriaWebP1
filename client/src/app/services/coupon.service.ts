import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { CouponList } from '../models/coupon-list';

@Injectable()
export class CouponService {

  constructor(private restangular: Restangular) { }

  getClients(token: string): Observable<Object[]> {

    return this.restangular.all('client/listClients').getList({}, {'x-access-token': token})
  }

  sendCoupons(couponList: CouponList): Observable<string> {

    return this.restangular.all('vendor/assignCoupon').post(couponList);
  }

}
