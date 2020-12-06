import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Category } from '../../shared/model';
import { CategoriesService } from './../services/categories.service';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[] | undefined> = EMPTY;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoriesService.getCategories();
  }

  redirect(slug: string) {
    this.router.navigate([slug]);
  }

  isMobile() {
    return this.platform.ANDROID || this.platform.IOS;
  }
}
