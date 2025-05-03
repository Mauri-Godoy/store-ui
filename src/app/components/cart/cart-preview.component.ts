import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-cart-preview',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './cart-preview.component.html'
})
export class CartPreviewComponent {
  readonly ShoppingCart = ShoppingCart;

  constructor(private cartService: CartService) {
  }

  get itemCount() {
    return this.cartService.getItemCount()
  }

  get total() {
    return this.cartService.getTotal()
  }
}
