import { Component } from '@angular/core';
import { CartPreviewComponent } from '../cart/cart-preview.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, User, Search, Gem } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, CartPreviewComponent, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  readonly User = User;
  readonly Search = Search;
  readonly Gem = Gem;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

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

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home'])
  }
}
