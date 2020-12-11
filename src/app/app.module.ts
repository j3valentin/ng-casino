import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesModule } from './categories/categories.module';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CategoriesModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
