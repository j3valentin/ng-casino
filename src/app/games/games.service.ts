import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { filter, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Game } from '../shared/model/game.model';
import { CategoriesResponse } from './categories-response.model';

@Injectable()
export class GamesService {
  private url: string = environment.endpoint + (environment.production ?
    'game-categories/{category}?brand=cherrycasino.desktop&locale=en' :
    'game-categories/{category}.json');
  private gamesUrl = environment.endpoint + (environment.production ?
    'games?brand=cherrycasino.desktop&locale=en' :
    'games.json' );

  constructor(private httpClient: HttpClient) {}

  getGamesByCategory(categorySlug: string): Observable<Game[]> {
    return this.httpClient
      .get<CategoriesResponse>(this.url.replace('{category}', categorySlug))
      .pipe(
        shareReplay({ bufferSize: 3, refCount: true }),
        map(response => response._embedded.games)
      ) as Observable<Game[]>;
  }

  searchGames(searchTerm: string): Observable<Game[]> {
    return this.httpClient
      .get<CategoriesResponse>(this.gamesUrl)
      .pipe(
        shareReplay({ bufferSize: 3, refCount: true }),
        map(response => response._embedded.games
          .filter(game => game.name.toLowerCase()
            .includes(searchTerm.toLowerCase())
          )
        ),
      ) as Observable<Game[]>;
  }
}
