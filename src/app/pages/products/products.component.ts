import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [CommonModule],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => this.getProducts(queryParams['search']));
  }

  getProducts(search?: string): void {
    this.loading = true;
    this.productService.getProducts(search).subscribe({
      next: data => {
        this.products = data;
      },
      complete: () => {
        this.loading = false;
      }
    }

    );
  }

  addToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
