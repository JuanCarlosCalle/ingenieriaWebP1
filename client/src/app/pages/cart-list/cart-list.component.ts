import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  cartProducts;
  batch;
  priceByVendor = [];

  // coupon reactivity logic
  vendorsName = [];
  vendorsIds = [];
  vendorsCoupon = [];
  done = false;

  // cart pricing details
  subtotalPrice;
  totalPrice;
  discount;
  shipping = 15000;

  constructor(private cartService: CartService) { }

  ngOnInit() {

    const user = localStorage.getItem('currentUser');
    const token = JSON.parse(user).token;

    this.cartService.returnCartProducts(token).subscribe(

      (cartProducts) => {

        this.cartProducts = cartProducts;
        this.batch = cartProducts.batch;
        this.getPriceByVendor(this.batch);
      }
    )
  }

  public getPriceByVendor(vendorBatch) {

    this.subtotalPrice = 0;
    this.totalPrice = 0;
    this.discount = 0;

    vendorBatch.forEach((vendor, index) => {

      let vendorPrice = 0;

      vendor.products.forEach((product) => {
        vendorPrice += product.price;
      });

      this.subtotalPrice += vendorPrice;

      if(vendor.hasCoupon) {
        this.getDiscount(vendorPrice);
        vendorPrice = +(vendorPrice * (9/10)).toFixed(2) ;

        if(!this.done) {
          this.vendorsName.push(vendor.vendorName);
          this.vendorsIds.push(vendor.id_vendor);
          this.vendorsCoupon.push(true);
        }
      }

      this.priceByVendor[index] = vendorPrice;
    });

    this.getTotalPrice();
    this.done = true;
    console.log(this.vendorsName);
    console.log(this.priceByVendor);
  }


  public getTotalPrice() {

    this.priceByVendor.forEach((vendorPrice) => {

      this.totalPrice += vendorPrice;
      console.log(this.totalPrice);
    });

    this.totalPrice += this.shipping;
  }


  public getDiscount(vendorPrice) {
    this.discount += +(vendorPrice * (1/10)).toFixed(2)
  }


  public onCheckboxClicked() {

    if(this.shipping === 15000) {
      this.totalPrice -= this.shipping;
      this.shipping = 0;
    } else {
      this.shipping = 15000;
      this.totalPrice += this.shipping;
    }
  }


  public onCouponClicked(id_vendor: string, index: number) {

    this.vendorsCoupon[index] = !this.vendorsCoupon[index];    // para estilos

    this.batch.forEach((vendor,vendorIndex) => {

      if(vendor.id_vendor === id_vendor) {
        this.batch[vendorIndex].hasCoupon = !this.batch[vendorIndex].hasCoupon;
      }
    });

    this.getPriceByVendor(this.batch);
    console.log(this.batch);
  }
}
