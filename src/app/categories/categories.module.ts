import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoriesService } from './services/categories.service';
import { CategoriesComponent } from './component/categories.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    CategoriesService
  ],
  exports: [
    CategoriesComponent
  ]
})
export class CategoriesModule { }
