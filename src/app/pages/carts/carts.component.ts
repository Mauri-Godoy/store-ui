import { Component } from '@angular/core';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carts',
  imports: [CommonModule],
  templateUrl: './carts.component.html'
})
export class CartsComponent {

  carts: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCarts();
  }

  getCarts() {
    this.cartService.getCarts().subscribe({
      next: (data) => {
        this.carts = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
