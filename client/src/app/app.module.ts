import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RestangularModule } from 'ngx-restangular';
import {ReactiveFormsModule} from "@angular/forms";

// componentes

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppRoutingModule} from "./app-routing/app-routing.module";
import { CartListComponent } from './pages/cart-list/cart-list.component';
import { LoginComponent } from './pages/login/login.component';
import { WorkstationComponent } from './pages/seller-dashboard/workstation/workstation.component';
import { InventoryComponent } from './pages/seller-dashboard/inventory/inventory.component';
import { CouponsComponent } from './pages/coupons/coupons.component';

// librerias

import {RestangularConfigFactory} from './shared/restConfig';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

// servicios

import { ProductService } from './services/product.service';
import { ProductFormComponent } from './pages/seller-dashboard/product-form/product-form.component';
import { CartService } from './services/cart.service';
import { LoginService } from './services/login.service';
import { CouponService } from './services/coupon.service';
import {VendorAuthGuard} from "./app-routing/guards/vendor.guard";
import {ClientAuthGuard} from "./app-routing/guards/cart.guard";


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductFormComponent,
    CartListComponent,
    LoginComponent,
    WorkstationComponent,
    InventoryComponent,
    CouponsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    ProductService,
    CartService,
    LoginService,
    CouponService,
    VendorAuthGuard,
    ClientAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
