import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  products: Object[];

  constructor(private productService: ProductService) { }

  ngOnInit() {

    const user = localStorage.getItem('currentUser');
    const token = JSON.parse(user).token;

    this.productService.getProductsByVendor(token).subscribe(
      (products) => {
        this.products = products;

        // todo: set a message for a null response
      },
      () => {
        // todo: set a message for an error response
      }
    )
  }

}
