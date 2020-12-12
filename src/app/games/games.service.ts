import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { concatMap, flatMap, map, mergeMap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game } from '../shared/model/game.model';
import { CategoriesResponse } from './categories-response.model';

const GET_GAMES = gql`query CasinoLobby($slug: String!) {
  lobby {
    categoryConnection(slug: $slug) {
      edges {
        node {
          ...Category
        }
      }
    }
  }
}fragment Category on LobbyCategory{
  slug
  name
  layoutConnection {
    edges {
      node {
        ...Layout
      }
    }
  }
}fragment Layout on LobbyCategoryLayout{
  blockMargin blocks{
    ...Block
  }
}fragment Block on LobbyCategoryLayoutBlock{
  type
  game {
    ...GameThumb
  }
}fragment GameThumb on Game{
  name
  description
  thumbnail
}`

@Injectable()
export class GamesService {
  private url: string = environment.endpoint + (environment.production ?
    'game-categories/{category}?brand=cherrycasino.desktop&locale=en' :
    'game-categories/{category}.json');
  private gamesUrl = environment.endpoint + (environment.production ?
    'games?brand=cherrycasino.desktop&locale=en' :
    'games.json' );

  constructor(
    private httpClient: HttpClient,
    private apollo: Apollo
  ) {}

  getGamesByCategory(categorySlug: string): Observable<Game[]> {
    return this.httpClient
      .get<CategoriesResponse>(this.url.replace('{category}', categorySlug))
      .pipe(
        shareReplay({ bufferSize: 3, refCount: true }),
        map(response => response._embedded.games)
      ) as Observable<Game[]>;
  }

  getGamesByCategoryGraphQL(categorySlug: string): Observable<Game[]> {
    return this.apollo.watchQuery({
      query: GET_GAMES,
      variables: { slug: categorySlug }
    }).valueChanges.pipe(
      map(({data}: any) => data.lobby.categoryConnection.edges
        .flatMap(({node}: any) => node.layoutConnection.edges)
        .flatMap(({node}: any) => node.blocks)
        .map(({game}: any) => game)
      ),
    );
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
