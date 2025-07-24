import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule for ngClass
import { CartService } from '../../Services/cart.service';
import { Product } from '../../Models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product-component.html',
  styleUrls: ['./product-component.css'],
  standalone: true,
  imports: [CommonModule] // <-- Add CommonModule here for ngClass
})
export class ProductComponent implements OnInit {
      @Input() product!: Product; // Input property to receive product data
      @Output() quickView = new EventEmitter<Product>(); // Event for quick view
      // @Output() addToCart = new EventEmitter<Product>(); // No longer needed if CartService is used directly
      isAddedToCart: boolean = false; // To control the 'added-to-cart' class

      constructor(private cartService: CartService) {} // Inject CartService

      ngOnInit(): void {
        // Check if the product is already in the cart on initialization
        this.isAddedToCart = this.cartService.isProductInCart(this.product.id);

        // Subscribe to cart changes to update the button state
        this.cartService.cartItems$.subscribe(items => {
          this.isAddedToCart = items.some(item => item.product.id === this.product.id);
        });
      }

      onQuickViewClick(): void {
        this.quickView.emit(this.product);
      }

      onAddToCart(): void {
        this.cartService.addToCart(this.product);
        console.log('Product added to cart:', this.product.name);
        // The button state will be updated via the subscription in ngOnInit
      }
    }