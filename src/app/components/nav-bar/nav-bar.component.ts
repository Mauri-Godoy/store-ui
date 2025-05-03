import { Component } from '@angular/core';
import { CartPreviewComponent } from '../cart/cart-preview.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, User, Search } from 'lucide-angular';

@Component({
  selector: 'app-nav-bar',
  imports: [CartPreviewComponent, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  readonly User = User;
  readonly Search = Search;

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
