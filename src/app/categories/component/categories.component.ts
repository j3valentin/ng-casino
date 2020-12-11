import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { Category } from '../../shared/model';
import { CategoriesService } from './../services/categories.service';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Category[]> = EMPTY;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    // this.apollo.watchQuery({
    //   query: gql`
    //     {
    //       lobby {
    //         categoryConnection {
    //           edges {
    //             node {
    //               name
    //               slug
    //             }
    //           }
    //         }
    //       }
    //     }
    //   `,
    // }).valueChanges.subscribe(result => console.log(result));

    this.categories$ = this.categoriesService.getCategories();
  }

  redirect(slug: string): void {
    this.router.navigate(['/', slug]);
  }
}
