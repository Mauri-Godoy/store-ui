import { Component } from '@angular/core';
import { CartPreviewComponent } from '../cart/cart-preview.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CartPreviewComponent, RouterModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

}
