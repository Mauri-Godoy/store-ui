import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  getProducts(search?: string) {
    let params = new HttpParams();
    if (search)
      params = params.append('search', search);

    return this.http.get<Product[]>(`${this.baseUrl}`, { params });
  }
}
