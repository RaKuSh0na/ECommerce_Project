// File: ECommerce/Client/src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs'; // Import Observable for asynchronous operations
import { environment } from '../Environments/environment'; // Import environment for API URL
import { Product } from '../Models/product.model'; // Assuming you have a Product model
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl + 'Products';

  constructor(private http: HttpClient, private authService: AuthService) { } // Inject HttpClient

  // Helper to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token}`
      });
    }
    // Return default headers if no token (for public endpoints)
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllProducts(): Observable<Product[]> {
    // No auth header needed for public Get All
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    // No auth header needed for public Get By ID
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // NEW: Admin method to create a product
  createProduct(product: Product): Observable<Product> {
    // Omit ID for creation, backend generates it
    const { id, ...productToCreate } = product;
    return this.http.post<Product>(this.apiUrl, productToCreate, { headers: this.getAuthHeaders() });
  }

  // NEW: Admin method to update a product
  updateProduct(id: number, product: Product): Observable<Product> {
    // Ensure ID is in the URL and body matches
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers: this.getAuthHeaders() });
  }

  // NEW: Admin method to delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
