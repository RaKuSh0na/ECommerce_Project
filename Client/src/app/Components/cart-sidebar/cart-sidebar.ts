// File: ECommerce/Client/src/app/component/cart-sidebar/cart-sidebar.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // For routerLink
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../Services/cart.service'; // Import CartItem interface

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.html',
  styleUrls: ['./cart-sidebar.css'],
  standalone: true,
  imports: [CommonModule, RouterLink] // Add RouterLink to imports
})
export class CartSidebarComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean = false; // This property controls the CSS class
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // Subscribe to sidebar open/close state from CartService
    this.subscriptions.add(
      this.cartService.isCartSidebarOpen$.subscribe(isOpen => {
        this.isSidebarOpen = isOpen; // Update local property to reflect service state
      })
    );

    // Subscribe to cart items changes
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.calculateCartTotal();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  closeSidebar(): void {
    this.cartService.closeCartSidebar(); // Use explicit close method
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(productId, newQuantity);
    } else {
      this.removeFromCart(productId);
    }
  }

  private calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}