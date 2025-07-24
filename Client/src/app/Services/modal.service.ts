    // File: ECommerce/Client/src/app/services/modal.service.ts
    import { Injectable } from '@angular/core';
    import { BehaviorSubject, Observable } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class ModalService {
      // BehaviorSubject to manage the visibility state of the auth modal
      private isAuthModalOpenSubject = new BehaviorSubject<boolean>(false);
      // Expose as an Observable for components to subscribe to
      public isAuthModalOpen$: Observable<boolean> = this.isAuthModalOpenSubject.asObservable();

      // BehaviorSubject to manage which form is active (login or register)
      private activeFormSubject = new BehaviorSubject<'login' | 'register'>('login');
      public activeForm$: Observable<'login' | 'register'> = this.activeFormSubject.asObservable();

      constructor() { }

      // Opens the auth modal and sets the initial form (default to login)
      openAuthModal(form: 'login' | 'register' = 'login'): void {
        this.activeFormSubject.next(form); // Set the form to display
        this.isAuthModalOpenSubject.next(true); // Open the modal
      }

      // Closes the auth modal
      closeAuthModal(): void {
        this.isAuthModalOpenSubject.next(false);
      }

      // Toggles between login and register forms within the modal
      toggleAuthForm(form: 'login' | 'register'): void {
        this.activeFormSubject.next(form);
      }
    }
    