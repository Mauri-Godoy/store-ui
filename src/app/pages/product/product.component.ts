import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html'
})
export class ProductComponent {

  product: Product | undefined;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
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
}
