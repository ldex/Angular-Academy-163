import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { FavouriteService } from '../favourite.service';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: []
})
export class ProductListComponent implements OnInit, OnDestroy {


  title: string = 'Products'
 // products: Product[];
  products$: Observable<Product[]>;
  productsNb = 0;
  selectedProduct: Product;
  subscription: Subscription;
  errorMessage: string;
  sorter = '-modifiedDate';

  sortList(propertyName: string): void {
    this.sorter = this.sorter.startsWith('-') ? propertyName : '-'+propertyName;
  }

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage(): void {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }
  nextPage(): void {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigateByUrl("/products/"+product.id);
  }

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private router: Router) {

  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit() {

     this.products$ = this
                        .productService
                        .products$
                        .pipe(
                          tap(
                            products => this.productsNb = products.length
                          ),
                          catchError(
                            error => {
                              this.errorMessage = error
                              return EMPTY;
                            }
                          )
                        );

    // this.subscription = this
    //   .productService
    //   .getProducts()
    //   .subscribe(
    //     results => this.products = results
    //   );
  }

}
