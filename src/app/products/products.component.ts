import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductPayload } from '../models/product';
import { ProductService } from '../services/product.service';

registerLocaleData(localeFr);

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm = '';
  productName = '';
  productPrice: number | null = null;
  loading = true;
  saving = false;
  errorMessage = '';
  noticeMessage = '';

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void { this.getProducts(); }

  get filteredProducts(): Product[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('fr');
    return this.products.filter(product => product.name.toLocaleLowerCase('fr').includes(query));
  }

  get selectedCount(): number { return this.products.filter(product => product.selected).length; }

  getProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getAllProducts().subscribe({
      next: products => { this.products = products; this.loading = false; },
      error: error => {
        console.error('Erreur lors du chargement des produits :', error);
        this.errorMessage = 'Impossible de joindre l’API. Vérifiez que le serveur Spring Boot est lancé sur le port 8083.';
        this.loading = false;
      }
    });
  }

  addProduct(): void {
    const name = this.productName.trim();
    const price = Number(this.productPrice);
    if (!name || !Number.isFinite(price) || price < 0) return;
    this.saving = true;
    this.noticeMessage = '';
    const payload: ProductPayload = { name, price, selected: false };
    this.productService.createProduct(payload).subscribe({
      next: product => {
        this.products = [...this.products, product].sort((a, b) => a.id - b.id);
        this.productName = '';
        this.productPrice = null;
        this.saving = false;
        this.noticeMessage = 'Produit ajouté au catalogue.';
      },
      error: error => {
        console.error('Erreur lors de la création du produit :', error);
        this.errorMessage = 'La création a échoué. Vérifiez que les données sont valides et que l’API est disponible.';
        this.saving = false;
      }
    });
  }

  handleDelete(product: Product): void {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le produit « ${product.name} » ?`)) return;
    this.productService.deleteProduct(product).subscribe({
      next: () => {
        this.products = this.products.filter(item => item.id !== product.id);
        this.noticeMessage = 'Produit supprimé du catalogue.';
      },
      error: error => {
        console.error('Erreur de suppression :', error);
        this.errorMessage = 'La suppression a échoué. Réessayez après avoir vérifié la connexion à l’API.';
      }
    });
  }

  toggleSelection(product: Product): void {
    const previous = product.selected;
    product.selected = !previous;
    this.productService.updateSelection(product, product.selected).subscribe({
      next: updated => {
        this.products = this.products.map(item => item.id === updated.id ? updated : item);
        this.noticeMessage = updated.selected ? 'Produit ajouté à la sélection.' : 'Produit retiré de la sélection.';
      },
      error: error => {
        console.error('Erreur de mise à jour du statut :', error);
        product.selected = previous;
        this.errorMessage = 'La mise à jour du statut a échoué. Réessayez.';
      }
    });
  }
}
