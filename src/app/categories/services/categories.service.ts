import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../../shared/model';
import { CategoriesResponse } from '../../shared/model/categories-response.model';

@Injectable()
export class CategoriesService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url =  environment.endpoint + (environment.production ?
      '/game-categories?brand=cherrycasino.desktop&locale=en' :
      '/game-categories@brand=cherrycasino.desktop.json');
  }

  getCategories(): Observable<Category[] | undefined> {
    return this.httpClient
      .get<CategoriesResponse>(this.url)
      .pipe(
        map(response => response._embedded.game_categories),
        shareReplay({ bufferSize: 3, refCount: true })
      );
  }
}
