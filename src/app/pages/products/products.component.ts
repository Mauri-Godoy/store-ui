import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { CartProduct } from '../../models/cart-product.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

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
    this.route.queryParams.subscribe((queryParams: any) => this.getProducts(queryParams['search'], queryParams['categoryId']));
  }

  getProducts(search?: string, categoryId?: number): void {
    this.loading = true;
    this.productService.getProducts(search, categoryId).subscribe({
      next: data => {
        this.products = data;
      },
      error: () => {
        this.loading = false;
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
