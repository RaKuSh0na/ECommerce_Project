import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import { CartService } from '../../Services/cart.service';
import { Product } from '../../Models/product.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-quickview',
  templateUrl: './quick-view.html',
  styleUrls: ['./quick-view.css'],
  standalone: true, // <-- ADD THIS LINE
  imports: [CommonModule, RouterModule] // <-- ADD THIS LINE (for *ngIf, ngClass if used in its template)
})
export class QuickviewComponent {
      @Input() product!: Product;
      @Input() isOpen: boolean = false;
      @Output() close = new EventEmitter<void>();

      constructor(private cartService: CartService) {}

      closeQuickView(): void {
        this.close.emit();
      }

      addToCart(product: Product): void {
        this.cartService.addToCart(product);
        console.log('Added to cart from quick view:', product.name);
        // Optionally, you might want to close the quick view after adding to cart
        // this.closeQuickView();
      }
    }
    