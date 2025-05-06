import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartProduct } from '../../models/cart-product.model';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [CommonModule, LucideAngularModule],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  readonly Plus = Plus;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
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
    });
  }

  addToCart(product: Product) {
    const cartProduct: CartProduct = { product: product, price: product.price, quantity: 1 };
    this.cartService.addItem(cartProduct);
  }

  redirectToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
