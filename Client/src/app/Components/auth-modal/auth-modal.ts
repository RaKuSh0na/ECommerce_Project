    // File: ECommerce/Client/src/app/component/auth-modal/auth-modal.component.ts
    import { Component, OnInit, OnDestroy } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { Subscription } from 'rxjs'; // To manage subscriptions
    import { ModalService } from '../../Services/modal.service'; // Import ModalService
    import { AuthService } from '../../Services/auth.service';// Import AuthService
    import { UserRegistration } from '../../Models/user-registration.model';
    import { UserLogin } from '../../Models/user-login.model';
    import { Router } from '@angular/router'; // To navigate after successful login/registration

    @Component({
      selector: 'app-auth-modal',
      templateUrl: './auth-modal.html',
      styleUrls: ['./auth-modal.css'],
      standalone: true,
      imports: [CommonModule, FormsModule]
    })
    export class AuthModalComponent implements OnInit, OnDestroy {
      isOpen: boolean = false; // Controls modal visibility
      activeForm: 'login' | 'register' = 'login'; // Controls which form is shown
      
      // Models for forms
      loginUser: UserLogin = { username: '', password: '' };
      registerUser: UserRegistration = { username: '', email: '', password: '' };

      loginError: string | null = null;
      registerError: string | null = null;

      private modalSubscription!: Subscription; // To unsubscribe from modal service
      private formSubscription!: Subscription; // To unsubscribe from form type changes

      constructor(
        private modalService: ModalService,
        private authService: AuthService,
        private router: Router
      ) {}

      ngOnInit(): void {
        // Subscribe to modal visibility changes
        this.modalSubscription = this.modalService.isAuthModalOpen$.subscribe(
          (isOpen) => {
            this.isOpen = isOpen;
            // Clear errors and reset forms when modal opens/closes
            if (isOpen) {
              this.loginError = null;
              this.registerError = null;
              this.loginUser = { username: '', password: '' };
              this.registerUser = { username: '', email: '', password: '' };
            }
          }
        );

        // Subscribe to active form changes (login/register)
        this.formSubscription = this.modalService.activeForm$.subscribe(
          (form) => {
            this.activeForm = form;
          }
        );
      }

      ngOnDestroy(): void {
        // Unsubscribe to prevent memory leaks
        if (this.modalSubscription) {
          this.modalSubscription.unsubscribe();
        }
        if (this.formSubscription) {
          this.formSubscription.unsubscribe();
        }
      }

      closeModal(): void {
        this.modalService.closeAuthModal();
      }

      toggleForm(form: 'login' | 'register'): void {
        this.modalService.toggleAuthForm(form);
        // Clear errors when switching forms
        this.loginError = null;
        this.registerError = null;
      }

      onLoginSubmit(): void {
        this.loginError = null; // Clear previous errors
        this.authService.login(this.loginUser).subscribe({
          next: (response) => {
            console.log('Login successful!', response);
            this.closeModal(); // Close modal on success
            this.router.navigate(['/']); // Navigate to home or dashboard
          },
          error: (error) => {
            console.error('Login failed:', error);
            if (error.status === 401) {
              this.loginError = 'Invalid username or password.';
            } else if (error.error && error.error.message) {
              this.loginError = error.error.message;
            } else {
              this.loginError = 'An unexpected error occurred during login. Please try again.';
            }
          }
        });
      }

      onRegisterSubmit(): void {
        this.registerError = null; // Clear previous errors
        this.authService.register(this.registerUser).subscribe({
          next: (response) => {
            console.log('Registration successful!', response);
            this.closeModal(); // Close modal on success
            this.router.navigate(['/']); // Navigate to home or dashboard
          },
          error: (error) => {
            console.error('Registration failed:', error);
            if (error.status === 400 && error.error && error.error.message) {
              this.registerError = error.error.message;
            } else {
              this.registerError = 'An unexpected error occurred during registration. Please try again.';
            }
          }
        });
      }
    }
    