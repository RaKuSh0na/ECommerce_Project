import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../Models/product.model';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-admin-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-product-management.html',
  styleUrl: './admin-product-management.css'
})
export class AdminProductManagementComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null; // For editing existing product
  newProduct: Product = { // For creating new product (dummy ID, will be ignored by backend)
    id: 0, // ID 0 for new products, backend generates real ID
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stock: 0
  };
  isEditing: boolean = false; // To toggle between add/edit form state

  loading: boolean = false;
  error: string | null = null;

  constructor(
    private productService: ProductService // Removed NotificationService injection
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products for admin:', err);
        this.error = 'Failed to load products. Please check backend connection.';
        // Removed notificationService.showError call
        this.loading = false;
      }
    });
  }

  // --- Form Management ---
  startAddNewProduct(): void {
    this.isEditing = false;
    this.selectedProduct = null;
    this.newProduct = { id: 0, name: '', description: '', price: 0, imageUrl: '', stock: 0 };
  }

  startEditProduct(product: Product): void {
    this.isEditing = true;
    this.selectedProduct = { ...product }; // Create a copy to avoid direct modification
    this.newProduct = { ...product }; // Populate form with existing product data
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedProduct = null;
    this.newProduct = { id: 0, name: '', description: '', price: 0, imageUrl: '', stock: 0 };
  }

  // --- CRUD Operations ---
  saveProduct(): void {
    this.loading = true;
    this.error = null;

    if (this.isEditing) {
      // Update existing product
      this.productService.updateProduct(this.newProduct.id, this.newProduct).subscribe({
        next: (updatedProduct) => {
          // Removed notificationService.showSuccess call
          this.loadProducts(); // Reload list
          this.cancelEdit(); // Reset form
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.error = 'Failed to update product.';
          // Removed notificationService.showError call
          this.loading = false;
        }
      });
    } else {
      // Create new product
      this.productService.createProduct(this.newProduct).subscribe({
        next: (createdProduct) => {
          // Removed notificationService.showSuccess call
          this.loadProducts(); // Reload list
          this.startAddNewProduct(); // Reset form for new entry
          this.loading = false;
        },
        error: (err) => {
          console.error('Error creating product:', err);
          this.error = 'Failed to create product.';
          // Removed notificationService.showError call
          this.loading = false;
        }
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      this.error = null;
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // Removed notificationService.showSuccess call
          this.loadProducts(); // Reload list
          this.loading = false;
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.error = 'Failed to delete product.';
          // Removed notificationService.showError call
          this.loading = false;
        }
      });
    }
  }
}