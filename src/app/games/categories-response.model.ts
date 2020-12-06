import { Game } from 'src/app/shared/model';
import { CategoriesBaseResponse } from '../shared/model/categories-response.model';

export interface Embedded {
  games: Game[];
}

export interface CategoriesResponse extends CategoriesBaseResponse {
  _embedded: Embedded;
}
