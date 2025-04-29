import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-nav-bar',
  imports: [CartComponent],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

}
