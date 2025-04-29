import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly storageKey = 'cart';
  private cartSubject = new BehaviorSubject<Product[]>(this.loadCart());

  cart$ = this.cartSubject.asObservable();

  private loadCart(): Product[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveCart(cart: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  addItem(item: Product): void {
    const cart = this.getCart();
    const existing = cart.find(p => p.id === item.id);
    if (existing) {
      existing.quantityToBuy += item.quantityToBuy;
    } else {
      item.quantityToBuy = 1
      cart.push({ ...item });
    }
    this.saveCart(cart);
  }

  removeItem(itemId: number): void {
    const cart = this.getCart().filter(item => item.id !== itemId);
    this.saveCart(cart);
  }

  updateQuantity(itemId: number, quantity: number): void {
    const cart = this.getCart().map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.saveCart(cart);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getTotal(): number {
    debugger
    return this.getCart().reduce((total, item) => total + item.price * item?.quantityToBuy || 0, 0);
  }

  getItemCount(): number {
    return this.getCart().reduce((total, item) => total + item?.quantityToBuy || 0, 0);
  }
}
