import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProduct } from '../../models/cart-product.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html'
})
export class ProductComponent {

  product: Product | undefined;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => this.getProducts(params['productId']));
  }

  getProducts(id: number): void {
    this.productService.getById(id).subscribe({
      next: data => {
        this.product = data;
      }
    });
  }

  addToCart(product: Product): void {
    const cartProduct: CartProduct = { product: product, price: product.price, quantity: 1 };
    this.cartService.addItem(cartProduct);
  }
}
