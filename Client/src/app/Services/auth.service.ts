import { Injectable, Injector } from '@angular/core';
import { environment } from '../Environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from '../Models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { UserRegistration } from '../Models/user-registration.model';
import { UserLogin } from '../Models/user-login.model';
import { ModalService } from './modal.service';
import { CartService } from './cart.service'; // Still import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'Auth/';
  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;

  constructor(
    private http: HttpClient,
    private injector: Injector, // ✅ FIX: Use Injector instead of direct CartService
    private modalService: ModalService
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  register(user: UserRegistration): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}register`, user).pipe(
      tap(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        this.modalService.closeAuthModal();
        this.injector.get(CartService).processPendingAddToCart(); // ✅ Lazy inject
      })
    );
  }

  login(user: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, user).pipe(
      tap(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        this.modalService.closeAuthModal();
        this.injector.get(CartService).processPendingAddToCart(); // ✅ Lazy inject
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.injector.get(CartService).clearCartAndCloseSidebar(); // ✅ Lazy inject
  }
}
