import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../../shared/model';
import { CategoriesResponse } from './categories-response.model';

const GET_CATEGORIES = gql`{
  lobby {
    categoryConnection {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
}`;

@Injectable()
export class CategoriesService {
  private categoriesUrl: string = environment.endpoint + (environment.production ?
    'game-categories?brand=cherrycasino.desktop&locale=en' :
    'game-categories.json');

  constructor(
    private httpClient: HttpClient,
    private apollo: Apollo
  ) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<CategoriesResponse>(this.categoriesUrl)
      .pipe(
        map(response => response._embedded.game_categories),
        shareReplay({ bufferSize: 3, refCount: true })
      );
  }

  getCategoriesGraphQL() {
    return this.apollo.watchQuery({query: GET_CATEGORIES}).valueChanges.pipe(
      map((result: any) => result.data.lobby.categoryConnection.edges
        .map((lobbyCategoryEdge: any) => lobbyCategoryEdge.node)
      )
    );
  }
}
