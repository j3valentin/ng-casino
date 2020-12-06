import { Category, Game } from 'src/app/shared/model';
import { CategoriesBaseResponse } from 'src/app/shared/model/categories-response.model';

export interface Embedded {
  game_categories: Category[];
}

export interface CategoriesResponse extends CategoriesBaseResponse {
  _embedded: Embedded;
}
