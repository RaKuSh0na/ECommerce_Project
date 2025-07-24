import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem, CartService } from '../../Services/cart.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderItem as FrontendOrderItem } from '../../Models/order-itme.model';
import { CreateOrder } from '../../Models/create-order.model';
import { environment } from '../../Environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [RouterModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  deliveryCharge: number = 5.00; // Placeholder for now, will get from backend later
  grandTotal: number = 0;
  private cartSubscription!: Subscription;

  checkoutForm = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    // paymentMethod is removed as it's fixed to COD on backend
  };

  orderMessage: string | null = null; // Changed from orderPlacedMessage for general messages

  constructor(
    private cartService: CartService,
    private authService: AuthService, // Inject AuthService
    private http: HttpClient, // Inject HttpClient
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });

    // Prefill email if user is logged in
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.checkoutForm.email = currentUser.email;
      // You could also prefill name/address if stored in user profile
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  private calculateTotals(): void {
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.grandTotal = this.cartTotal + this.deliveryCharge;
  }

  placeOrder(): void {
    this.orderMessage = null; // Clear previous messages

    if (this.cartItems.length === 0) {
      this.orderMessage = 'Your cart is empty. Please add items before placing an order.';
      return;
    }

    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.token) {
      this.orderMessage = 'You must be logged in to place an order.';
      this.router.navigate(['/']); // Redirect to home or login
      this.cartService.closeCartSidebar(); // Ensure cart sidebar is closed
      return;
    }

    // Map CartItem to Backend OrderItemDto
    const orderItems: FrontendOrderItem[] = this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    // Construct the CreateOrder DTO
    const createOrderDto: CreateOrder = {
      orderItems: orderItems,
      shippingAddress: this.checkoutForm.address,
      city: this.checkoutForm.city,
      zipCode: this.checkoutForm.zipCode,
    };

    // Set up headers with JWT token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token}`
    });

    // Make the HTTP POST request to your backend
    this.http.post<any>(`${environment.apiUrl}Orders`, createOrderDto, { headers }).subscribe({
      next: (response) => {
        console.log('Order placed successfully!', response);
        this.cartService.clearCartAndCloseSidebar(); // Clear cart after successful order
        this.orderMessage = 'Your order has been placed successfully! Thank you for your purchase.';
        // Optionally navigate to a confirmation page or home after a delay
        setTimeout(() => {
          this.router.navigate(['/']); // Navigate to home page
          this.orderMessage = null; // Clear message
        }, 3000);
      },
      error: (error) => {
        console.error('Order placement failed:', error);
        if (error.status === 401) {
          this.orderMessage = 'You are not authorized to place an order. Please log in again.';
          this.authService.logout(); // Log out user if token is invalid
          this.router.navigate(['/']);
        } else if (error.error && error.error.message) {
          this.orderMessage = `Order failed: ${error.error.message}`;
        } else {
          this.orderMessage = 'An unexpected error occurred during order placement. Please try again.';
        }
      }
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    this.cartService.updateQuantity(productId, newQuantity);
  }
}