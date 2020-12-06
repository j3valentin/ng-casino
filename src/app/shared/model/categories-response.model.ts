import { Links } from 'src/app/shared/model/links.model';

export interface CategoriesBaseResponse {
  name: string;
  order: number;
  slug: string;
  _links: Links;
}
