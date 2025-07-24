import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule for *ngIf
import { ProductComponent } from '../product-component/product-component';
import { NavBarComponent } from '../nav-bar/nav-bar';
import { QuickviewComponent } from '../quick-view/quick-view';// <-- Corrected import: QuickviewComponent (lowercase 'v')
import { Product } from '../../Models/product.model';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list-component.css'],
  standalone: true,
  imports: [CommonModule, ProductComponent, QuickviewComponent] // <-- Add CommonModule and QuickviewComponent
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedQuickViewProduct: Product | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        console.log('Products fetched from backend:', this.products);
      },
      error: (err) => {
        console.error('Error fetching products from backend:', err);
        this.loading = false;
        this.error = 'Could not load products. Please try again later.';
        // Fallback to dummy data if backend is not available or errors
        this.products = [
          { id: 1, name: 'Gaming Headset (Fallback)', description: 'High-fidelity gaming headset with surround sound.', price: 79.99, imageUrl: 'https://placehold.co/400x300/3f3f3f/ffffff?text=Headset', stock: 50 },
          { id: 2, name: 'Mechanical Keyboard (Fallback)', description: 'RGB mechanical keyboard with tactile switches.', price: 129.99, imageUrl: 'https://placehold.co/400x300/3f3f3f/ffffff?text=Keyboard', stock: 30 },
          { id: 3, name: 'Wireless Mouse (Fallback)', description: 'Ergonomic wireless mouse with customizable DPI.', price: 49.99, imageUrl: 'https://placehold.co/400x300/3f3f3f/ffffff?text=Mouse', stock: 70 },
          { id: 4, name: 'Curved Gaming Monitor (Fallback)', description: '27-inch curved gaming monitor with 144Hz refresh rate. Immerse yourself in stunning visuals and smooth gameplay.', price: 299.99, imageUrl: 'https://placehold.co/400x300/3f3f3f/ffffff?text=Monitor', stock: 20 },
          { id: 5, name: 'Webcam 1080p (Fallback)', description: 'Full HD 1080p webcam with autofocus. Perfect for streaming, video calls, and online meetings.', price: 59.99, imageUrl: 'https://placehold.co/400x300/3f3f3f/ffffff?text=Webcam', stock: 100 },
          { id: 6, name: 'Gaming Chair (Fallback)', description: 'Ergonomic gaming chair with lumbar support. Designed for long gaming sessions, providing maximum comfort and adjustability.', price: 199.99, imageUrl: 'https://placehold.co/400x300/3f3f3f/ffffff?text=Chair', stock: 40 },
          { id: 7, name: 'External SSD 1TB (Fallback)', description: 'Portable 1TB SSD for blazing-fast data transfer. Ideal for games and content creators needing extra storage and speed.', price: 99.99, imageUrl: 'https://placehold.co/400x300/3f3f3f/ffffff?text=SSD', stock: 60 }
        ];
      }
    });
  }

  onAddToCart(product: Product): void {
    console.log('Product added to cart:', product.name);
  }

  onQuickView(product: Product): void {
    this.selectedQuickViewProduct = product;
  }

  closeQuickView(): void {
    this.selectedQuickViewProduct = null;
  }
}