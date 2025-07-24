// File: ECommerce/Client/src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar';
import { ProductListComponent } from './Components/product-list-component/product-list-component';
import { CartSidebarComponent } from './Components/cart-sidebar/cart-sidebar';
import { AuthModalComponent } from './Components/auth-modal/auth-modal';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    RouterOutlet,
    NavBarComponent,
    CartSidebarComponent,
    AuthModalComponent
]
})
export class AppComponent {
  title = 'angular-app';
}
