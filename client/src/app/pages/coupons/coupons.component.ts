import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import { CouponList } from '../../models/coupon-list';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  clients: Object[];
  clientsCoupon = [];
  couponList: CouponList;
  message;

  constructor(private couponService: CouponService) { }

  ngOnInit() {

    const user = localStorage.getItem('currentUser');
    const token = JSON.parse(user).token;

    this.couponService.getClients(token).subscribe(
      (clients) => {
        this.clients = clients;
      }
    )
  }

  addCoupon(clientId) {

      let clientFound = false;

      this.clientsCoupon = this.clientsCoupon.filter(function (id) {
        if(id === clientId) {
          clientFound = true;
          return false;
        }
        return true;
      });

      if(!clientFound) {
        this.clientsCoupon.push(clientId);
      }
  }

  sendCoupons() {

    this.couponList = new CouponList(this.clientsCoupon);

    this.couponService.sendCoupons(this.couponList).subscribe(
      () => {

        // todo: set a modal to show a response
        this.message = "Los cupones se agregaron adecuadamente"
      }
    )
  }
}
