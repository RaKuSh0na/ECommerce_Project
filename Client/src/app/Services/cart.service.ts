// File: ECommerce/Client/src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Models/product.model'; // Import Product model
import { AuthService } from './auth.service'; // Import AuthService for authentication checks
import { ModalService } from './modal.service'; // Import ModalService for opening modals

// Define the CartItem interface
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$: Observable<number> = this.cartCountSubject.asObservable();

  private isCartSidebarOpenSubject = new BehaviorSubject<boolean>(false);
  public isCartSidebarOpen$: Observable<boolean> = this.isCartSidebarOpenSubject.asObservable();

  private pendingProductToAdd: Product | null = null;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.value));
    localStorage.setItem('cartCount', this.cartCountSubject.value.toString());
  }

  private loadCartFromLocalStorage(): void {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      const items: CartItem[] = JSON.parse(storedItems);
      this.cartItemsSubject.next(items);
    }

    const storedCount = localStorage.getItem('cartCount');
    if (storedCount) {
      this.cartCountSubject.next(parseInt(storedCount, 10));
    } else {
      this.updateCartCount();
    }
  }

  private updateCartCount(): void {
    const currentItems = this.cartItemsSubject.value;
    const totalCount = currentItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(totalCount);
    this.saveCartToLocalStorage();
  }

  addToCart(product: Product): void {
    if (!this.authService.currentUserValue) {
      console.log('User not logged in. Storing product for pending add and opening login modal.');
      this.pendingProductToAdd = product;
      this.modalService.openAuthModal('login');
      return;
    }
    this.executeAddToCart(product);
  }

  private executeAddToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.cartItemsSubject.next([...currentItems]);
    this.updateCartCount();
    this.saveCartToLocalStorage();
    this.openCartSidebar();
  }

  processPendingAddToCart(): void {
    if (this.pendingProductToAdd) {
      console.log('Processing pending add to cart for:', this.pendingProductToAdd.name);
      this.executeAddToCart(this.pendingProductToAdd);
      this.pendingProductToAdd = null;
    }
  }

  removeFromCart(productId: number): void {
    let currentItems = this.cartItemsSubject.value;
    currentItems = currentItems.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(currentItems);
    this.updateCartCount();
    this.saveCartToLocalStorage();
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const itemToUpdate = currentItems.find(item => item.product.id === productId);

    if (itemToUpdate) {
      if (newQuantity <= 0) {
        this.removeFromCart(productId);
      } else {
        itemToUpdate.quantity = newQuantity;
        this.cartItemsSubject.next([...currentItems]);
        this.updateCartCount();
        this.saveCartToLocalStorage();
      }
    }
  }

  isProductInCart(productId: number): boolean {
    return this.cartItemsSubject.value.some(item => item.product.id === productId);
  }

  // Original clearCart method (can be used internally if needed without closing sidebar)
  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.cartCountSubject.next(0); // Ensure count also resets
    this.saveCartToLocalStorage();
  }

  // NEW: Method to clear cart and explicitly close the sidebar
  clearCartAndCloseSidebar(): void {
    this.clearCart(); // Clear the items and count
    this.closeCartSidebar(); // Explicitly close the sidebar
  }

  toggleCartSidebar(): void {
    this.isCartSidebarOpenSubject.next(!this.isCartSidebarOpenSubject.value);
  }

  openCartSidebar(): void {
    this.isCartSidebarOpenSubject.next(true);
  }

  closeCartSidebar(): void {
    this.isCartSidebarOpenSubject.next(false);
  }
}
