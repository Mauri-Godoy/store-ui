import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

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
}
