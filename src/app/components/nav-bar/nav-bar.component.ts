import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Search, Store, User } from 'lucide-angular';
import { Category } from '../../models/category.model';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { CartPreviewComponent } from '../cart/cart-preview.component';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, CartPreviewComponent, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  readonly User = User;
  readonly Search = Search;
  readonly Store = Store;
  categories: Category[] = []
  search: string = ''
  categoryId: number | undefined

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.search = queryParams['search']
      this.categoryId = queryParams['categoryId']
    });
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
