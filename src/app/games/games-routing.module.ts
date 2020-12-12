import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';

const routes = [
  {
    path: 'search/:searchTerm',
    component: GamesComponent
  },
  {
    path: ':category',
    component: GamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule { }
