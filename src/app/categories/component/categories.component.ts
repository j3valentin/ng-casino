import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { Category } from '../../shared/model';
import { CategoriesService } from './../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]> = EMPTY;
  categoriesGql$: Observable<Category[]> = EMPTY;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesGql$ = this.categoriesService.getCategoriesGraphQL();
    this.categories$ = this.categoriesService.getCategories();
  }

  redirect(slug: string): void {
    this.router.navigate(['/', slug]);
  }
}
