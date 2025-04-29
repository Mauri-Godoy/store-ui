import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html'
})
export class CartComponent {

  constructor(private cartService: CartService) { }

  get cartItems() {
    return this.cartService.getCart()
  }
}
