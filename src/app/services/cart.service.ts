import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartProduct } from '../models/cart-product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/cart`;
  private readonly storageKey = 'cart';
  private cartSubject = new BehaviorSubject<CartProduct[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  private loadCart(): CartProduct[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveCart(cart: CartProduct[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCart(): CartProduct[] {
    return this.cartSubject.value;
  }

  addItem(item: CartProduct): void {
    const cart = this.getCart();
    const existing = cart.find(cp => cp.product.id === item.product.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      item.quantity = 1
      cart.push({ ...item });
    }
    this.saveCart(cart);
  }

  removeItem(productId: number): void {
    const cart = this.getCart().filter(item => item.product.id !== productId);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getTotal(): number {
    return this.getCart().reduce((total, item) => total + item.price * item?.quantity || 0, 0);
  }

  getItemCount(): number {
    return this.getCart().reduce((total, item) => total + item?.quantity || 0, 0);
  }

  createCart(cart: Cart) {
    return this.http.post(`${this.baseUrl}`, cart);
  }

  getCarts() {
    return this.http.get<Cart[]>(`${this.baseUrl}`);
  }
}
