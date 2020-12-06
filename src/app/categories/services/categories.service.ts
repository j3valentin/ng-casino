import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../../shared/model';
import { CategoriesResponse } from './categories-response.model';

@Injectable()
export class CategoriesService {
  private categoriesUrl: string = environment.endpoint + (environment.production ?
    'game-categories?brand=cherrycasino.desktop&locale=en' :
    'game-categories.json');

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<CategoriesResponse>(this.categoriesUrl)
      .pipe(
        map(response => response._embedded.game_categories),
        shareReplay({ bufferSize: 3, refCount: true })
      );
  }
}
