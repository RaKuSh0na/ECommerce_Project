import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common'; // <-- Add CommonModule if you use ngIf/ngFor in nav-bar.html
import { LoginResponse } from '../../Models/login-response.model';
import { ModalService } from '../../Services/modal.service';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css'],
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule, RouterLink] // <-- Add CommonModule here if needed for its template
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  isCartSidebarOpen: boolean = false;
  currentUser: LoginResponse | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private modalService: ModalService,
    public authService: AuthService // Public to access currentUserValue in template if needed, though we'll use local prop
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.cartService.cartCount$.subscribe(count => {
        this.cartItemCount = count;
      })
    );

    this.subscriptions.add(
      this.cartService.isCartSidebarOpen$.subscribe(isOpen => {
        this.isCartSidebarOpen = isOpen;
      })
    );

    this.subscriptions.add(
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Modified toggleCartSidebar to check authentication status
  toggleCartSidebar(): void {
    if (this.authService.currentUserValue) {
      // If logged in, toggle the cart sidebar normally
      this.cartService.toggleCartSidebar();
    } else {
      // If not logged in, open the login/registration modal
      console.log('User not logged in. Opening login modal from cart button.');
      this.modalService.openAuthModal('login');
    }
  }

  openLoginModal(): void {
    this.modalService.openAuthModal('login');
  }

  openRegisterModal(): void {
    this.modalService.openAuthModal('register');
  }

  onLogout(): void {
    this.authService.logout();
  }
}
