import { Component } from '@angular/core';
import { CartPreviewComponent } from '../cart/cart-preview.component';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [CartPreviewComponent, RouterModule, FormsModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  search: string = ''

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.search = queryParams['search'];
    });
  }

  searchProducts() {
    const search = this.search.trim().toLowerCase();
    this.router.navigate(['/products'], { queryParams: { search } });
  }
}
