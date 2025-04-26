import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [RouterModule],
  templateUrl: './carousel.component.html'
})
export class CarouselComponent {
  private intervalId: any;
  private currentItemIndex = 0;
  private items = ['item1', 'item2', 'item3', 'item4']; // IDs de tus elementos

  constructor(private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoScroll() {
    this.intervalId = setInterval(() => {
      this.scrollTo(this.items[this.currentItemIndex]);
      this.currentItemIndex = (this.currentItemIndex + 1) % this.items.length; // Loop circular
    }, 3000); // cada 3000ms (3 segundos)
  }

  scrollToAndResetInterval(id: string) {
    this.scrollTo(id);
    this.resetCarousel(); // Reinicia el carrusel al hacer scroll
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


}
