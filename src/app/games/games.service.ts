import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Game } from '../shared/model/game.model';
import { CategoriesResponse } from '../shared/model/categories-response.model';

@Injectable()
export class GamesService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.endpoint + (environment.production ?
      '/game-categories/{category}?brand=cherrycasino.desktop&locale=en' :
      ;
  }

  getGamesByCategory(categorySlug: string): Observable<Game[]> {
    return this.httpClient
      .get<CategoriesResponse>(this.url.replace('{category}', categorySlug))
      .pipe(
        shareReplay({ bufferSize: 3, refCount: true }),
        map(response => response._embedded?.games)
      ) as Observable<Game[]>;
  }
}
