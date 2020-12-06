import { Game } from './game.model';
import { Links } from './links.model';

export interface Embedded {
  games: Game[] | undefined;
}

export interface Category {
  slug: string;
  order: number;
  name: string;
  _links?: Links;
  _embedded: Embedded;
}
