import 'polyfills';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CustomerSearchComponent} from 'CustomerSearchComponent';

const CustomerAppModule = NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule ],
    declarations: [ CustomerSearchComponent ],
    bootstrap: [ CustomerSearchComponent ]
}).Class({
    constructor() {
    }
});

platformBrowserDynamic().bootstrapModule(CustomerAppModule).then();
