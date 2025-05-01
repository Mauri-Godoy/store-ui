import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule],
})
export class CartComponent {

  constructor(private cartService: CartService) { }

  get cartItems() {
    return this.cartService.getCart()
  }

  createCart() {
    const cart: Cart = {
      cartProducts: this.cartItems
    }

    this.cartService.createCart(cart).subscribe({
      next: (data) => {
        console.log(data);
        this.cartService.clearCart();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
