import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-preview',
  imports: [RouterModule],
  templateUrl: './cart-preview.component.html'
})
export class CartPreviewComponent {

  constructor(private cartService: CartService) {
  }

  get itemCount() {
    return this.cartService.getItemCount()
  }

  get total() {
    return this.cartService.getTotal()
  }
}
