// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './Components/product-list-component/product-list-component';
import { ProductDescriptionPageComponent } from './Components/product-description/product-description';
import { CheckoutPageComponent } from './Components/checkout/checkout'; // Assuming you have a CheckoutPageComponent
import { AuthGuard } from './Guard/auth-guard';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard';
import { AdminGuard } from './Guard/admin-guard'; // Import your AdminGuard
import { AdminProductManagementComponent } from './Components/admin-product-management/admin-product-management';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
   // Default route to show product list
  { path: 'product/:id', component: ProductDescriptionPageComponent }, // <-- Ensure this route is defined
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] }, // Protect checkout route with AuthGuard
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/products', // <-- NEW: Route for Admin Product Management
    component: AdminProductManagementComponent,
    canActivate: [AdminGuard] // Protect with AdminGuard
  },
    // No need for login/register routes if they are modals
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

