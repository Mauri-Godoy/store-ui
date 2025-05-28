import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { Cart } from '../../models/cart.model';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule, RouterModule, LucideAngularModule],
})
export class CartComponent {

  readonly Trash = Trash;

  constructor(private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) { }

  get cartItems() {
    return this.cartService.getCart()
  }

  createCart() {
    const cart: Cart = {
      cartProducts: this.cartItems
    }

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.createCart(cart).subscribe({
      next: (data) => {
        console.log(data);
        this.cartService.clearCart();
        this.toast.success('Compra finalizada con éxito');
        this.router.navigate(['/carts']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  get total() {
    return this.cartService.getTotal()
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }
}
