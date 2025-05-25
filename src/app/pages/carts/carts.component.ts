import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carts',
  imports: [CommonModule, RouterModule],
  templateUrl: './carts.component.html'
})
export class CartsComponent {

  cartsMap: { date: string; carts: Cart[] }[] = [];

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
}
