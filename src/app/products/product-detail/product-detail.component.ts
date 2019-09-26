import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.interface';
import { FavouriteService } from '../favourite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { map, filter, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private favouriteService: FavouriteService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
    ) { }

  deleteProduct(id: number): void {
    if(window.confirm('Are you sure ???')) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        },
        error => console.log('Could not delete product: ', error)
      )
    }
  }

  newFavourite(product: Product): void {
    this.favouriteService.addToFavourites(product);
  }

  ngOnInit() {
    const id: number = this.activatedRoute.snapshot.params['id'];

    this.product$ = this
                  .productService
                  .products$
                  .pipe(
                    flatMap(p => p),
                    filter(product => product.id == id)
                  )
  }

}
