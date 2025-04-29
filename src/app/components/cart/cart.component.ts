import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  constructor(private cartService: CartService) {
  }

  get itemCount() {
    return this.cartService.getItemCount()
  }

  get total(){
    return this.cartService.getTotal()
  }
}
