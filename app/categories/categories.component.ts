import { Component, OnInit } from '@angular/core';

import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  category: Category;
  categories: Category[];
  configured: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }
 
  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }
 
  getConfiguredCategories(): void {
    this.categoryService.getConfiguredCategories()
    .subscribe(configured => this.configured = configured);
  }
 
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.categoryService.addCategory({ name } as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
  }
 
  delete(category: Category): void {
    this.categories = this.categories.filter(h => h !== category);
    this.categoryService.deleteCategory(category).subscribe();
  }

  swapCategory(id: number): void {
  	//console.log(id);
    //this.categories = this.categories.filter(h => h !== category);

    this.categoryService.swapCategory(id)
      .subscribe(category => {this.configured.push(category)});

    //this.categories = getCategories();
    //this.configured = getConfiguredCategories();

  	//swapping = "";
  }

  restoreCategory(id: number): void {
  	//console.log(id);
    //this.configured = this.configured.filter(h => h !== category);

    this.categoryService.restoreCategory(id)
      .subscribe(); //category => this.categories.push(category)

    //this.categories = getCategories();
    //this.configured = getConfiguredCategories();

  	//restore = "";
  }

}

