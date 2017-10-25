import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

// models

import { Product } from "../../../models/product";

// services

import { ProductService } from "../../../services/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  productForm: FormGroup;
  productData: Product;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router) {

    this.createForm();
  }

  ngOnInit() {
  }

  // todo: make all fields require
  createForm() {
    this.productForm = this.formBuilder.group({
      name: '',
      description: '',
      price: '',
      quantity: ''
    });

    // todo: validate changes
  }

  onSubmit() {

    let fileInput = this.fileInput.nativeElement;

    if (fileInput.files && fileInput.files[0]) {

      this.productService.postImage(fileInput.files[0]).subscribe(
        (route) => {

          let productInformation = this.productForm.value;
          productInformation.image = route;

          this.productData = new Product(productInformation);

          this.productService.saveProduct(this.productData).subscribe(
            () => {
              this.router.navigate(['/dashboard']);
            },
            (errmess) => {

              // todo: set a proper error message in the client UI
              console.log(errmess);
            }
          );

        },
        (errmess) => {

          // todo: set a proper error message in the client UI
          console.log(errmess);
        }
      );

    } else {

      // todo: set a proper error message in the client UI
      console.log('Selecciona una imagen antes de enviar el formulario')
    }
  }
}
