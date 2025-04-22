import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterOutlet
  ]
})
export class ProductModule { }
