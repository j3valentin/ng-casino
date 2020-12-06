import { Category, Game } from 'src/app/shared/model';
import { Links } from 'src/app/shared/model/links.model';

export interface Embedded {
  games?: Game[] | undefined;
  game_categories?: Category[] | undefined;
}

export interface CategoriesResponse {
  name: string;
  order: number;
  slug: string;
  _embedded: Embedded;
  _links: Links;
}
