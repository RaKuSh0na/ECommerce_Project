import { Component, OnInit, OnDestroy } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ActivatedRoute, Router } from '@angular/router';
    import { Subscription } from 'rxjs';
    import { switchMap } from 'rxjs/operators';
    import { ProductService } from '../../Services/product.service';
    import { CartService } from '../../Services/cart.service';// <-- NEW: Import CartService
    import { Product } from '../../Models/product.model';

    @Component({
      selector: 'app-product-description',
      templateUrl: './product-description.html',
      styleUrls: ['./product-description.css'],
      standalone: true,
      imports: [CommonModule]
    })
    export class ProductDescriptionPageComponent implements OnInit, OnDestroy {
      product: Product | undefined;
      private routeSubscription: Subscription = new Subscription();

      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private cartService: CartService // <-- NEW: Inject CartService
      ) {}

      ngOnInit(): void {
        this.routeSubscription.add(
          this.route.paramMap.pipe(
            switchMap(params => {
              const productIdString = params.get('id');
              const productId = productIdString ? parseInt(productIdString, 10) : NaN;

              if (!isNaN(productId)) {
                return this.productService.getProductById(productId);
              } else {
                return [undefined];
              }
            })
          ).subscribe({
            next: (product) => {
              if (product) {
                this.product = product;
              } else {
                console.error('Product ID not found in route or product not found on backend.');
                this.router.navigate(['/']);
              }
            },
            error: (err) => {
              console.error('Error fetching product details from backend:', err);
              this.router.navigate(['/']);
            }
          })
        );
      }

      ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
      }

      goBack(): void {
        this.router.navigate(['/']);
      }

      // NEW: Method to add the current product to the cart
      addToCart(): void {
        if (this.product) {
          this.cartService.addToCart(this.product);
          console.log('Product added to cart from description page:', this.product.name);
          // Optionally, provide user feedback (e.g., a toast notification)
        }
      }
    }
    