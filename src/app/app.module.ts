import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesModule } from './categories/categories.module';
import { MaterialModule } from './shared/material.module';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CategoriesModule,
    MaterialModule
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
