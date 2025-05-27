import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-carts',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './carts.component.html'
})
export class CartsComponent {
  X = X;
  cartsMap: { date: string; carts: Cart[] }[] = [];
  cartSelected: Cart | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCarts();
  }

  getCarts() {
    this.cartService.getCartsGroupedByDate().subscribe({
      next: (data) => {
        this.cartsMap = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  selectCart(cart: Cart | null) {
    this.cartSelected = cart;
  }
}
