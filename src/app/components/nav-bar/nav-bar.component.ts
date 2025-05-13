import { Component } from '@angular/core';
import { CartPreviewComponent } from '../cart/cart-preview.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, User, Search, Gem } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, CartPreviewComponent, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  readonly User = User;
  readonly Search = Search;
  readonly Gem = Gem;
  categories: Category[] = []
  search: string = ''

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => this.search = queryParams['search']);
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getAll().subscribe(data => this.categories = data)
  }

  searchProducts() {
    const search = this.search.trim().toLowerCase();
    this.router.navigate(['/products'], { queryParams: { search } });
  }

  filterByCategory(categoryId: number) {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/home'])
  }
}
