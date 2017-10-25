import {Routes } from '@angular/router';
import {HomePageComponent} from '../pages/home-page/home-page.component';
import {ProductFormComponent} from '../pages/seller-dashboard/product-form/product-form.component';
import {CartListComponent} from '../pages/cart-list/cart-list.component';
import {LoginComponent} from '../pages/login/login.component';
import {WorkstationComponent} from '../pages/seller-dashboard/workstation/workstation.component';
import {InventoryComponent} from '../pages/seller-dashboard/inventory/inventory.component';
import {CouponsComponent} from '../pages/coupons/coupons.component';
import {VendorAuthGuard} from './guards/vendor.guard';
import {ClientAuthGuard} from "./guards/cart.guard";

export const routes: Routes = [
  // todo: redirect a vendor to its dashboard whenever he access the homepage
  {path: 'home', component: HomePageComponent},
  {path: 'new', component: ProductFormComponent},
  {path: 'cart-list', component: CartListComponent, canActivate: [ClientAuthGuard]},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard', component: WorkstationComponent, canActivate: [VendorAuthGuard],
    children: [
      {
        path: '', redirectTo: 'inventory', pathMatch: 'full'
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'coupons',
        component: CouponsComponent
      }
    ]
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
