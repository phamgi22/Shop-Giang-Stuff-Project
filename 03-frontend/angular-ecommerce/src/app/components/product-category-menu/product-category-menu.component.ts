import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  
  // Inject ProductService into ProductCategoryMenuComponent
  constructor(private productService: ProductService) { }

  // ngOnInit is same as PostConstruct Spring Boot
  ngOnInit() {
    this.listProductCategories();
  }

  // when new data is emitted be observable return by getProductCategories
  // subscribe() take one or more callback function, which are executed when new data is emitted by observable
  // callback function data => {...} is executed: log data to console
  // finally assign data to this.productCategories
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
