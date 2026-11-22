import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductPayload } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly host = 'http://localhost:8083';

  constructor(private readonly http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products`);
  }

  createProduct(product: ProductPayload): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${this.host}/products/${product.id}`);
  }

  updateSelection(product: Product, selected: boolean): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/products/${product.id}/selection`, { selected });
  }
}
