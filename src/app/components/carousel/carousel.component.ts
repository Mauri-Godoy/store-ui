import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowRight, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-carousel',
  imports: [RouterModule, CommonModule, LucideAngularModule],
  templateUrl: './carousel.component.html'
})
export class CarouselComponent {
  private intervalId: any;
  public currentItemIndex = 0;
  readonly ArrowRight = ArrowRight;
  readonly ArrowLeft = ArrowLeft;
  @Input() products: Product[] = []; // IDs de tus elementos

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoScroll() {
    this.intervalId = setInterval(() => {
      this.scrollTo(this.products[this.currentItemIndex].id.toString());
      this.currentItemIndex = (this.currentItemIndex + 1) % this.products.length; // Loop circular
    }, 5000); // cada ms % 1000 segundos
  }

  scrollToAndResetInterval(id: string) {
    this.scrollTo(id);
    this.resetCarousel();
  }

  scrollByIndex(i: number, next: boolean) {
    if (!next) {
      if (i == 0)
        i = this.products.length - 1;
      else
        i--;
    }
    else if (next && this.products.length > i + 1) {
      i++;
    }
    else {
      i = 0
    }

    this.currentItemIndex = i;
    this.scrollToAndResetInterval(this.products[i].id.toString())
  }

  scrollTo(id: string) {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  resetCarousel() {
    clearInterval(this.intervalId);
    this.startAutoScroll();
  }

  redirectToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}
