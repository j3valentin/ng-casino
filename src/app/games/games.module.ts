import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesService } from './games.service';
import { GamesRoutingModule } from './games-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MaterialModule
  ],
  providers: [
    GamesService
  ]
})
export class GamesModule { }
