import 'polyfills';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { CustomerSearchComponent } from 'CustomerSearchComponent';
import { CustomerDetailsComponent } from 'CustomerDetailsComponent';

const routing = RouterModule.forRoot([
  {
    path: '',
    component: CustomerSearchComponent,
  },
  {
    path: ':id',
    component: CustomerDetailsComponent,
  },
]);

const AppComponent = Component({
  selector: 'shine-customers-app',
  template: '<router-outlet></router-outlet>',
}).Class({
  constructor: [
    function() {
    },
  ],
});

const CustomerAppModule = NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  declarations: [
    CustomerSearchComponent,
    CustomerDetailsComponent,
    AppComponent,
  ],
  bootstrap: [AppComponent],
}).Class({
  constructor() {
  },
});

platformBrowserDynamic().bootstrapModule(CustomerAppModule).then();
