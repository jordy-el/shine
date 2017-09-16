import { Component } from '@angular/core';
import { Http } from '@angular/http';
import template from './template.html';

const CustomerSearchComponent = Component({
    selector: 'shine-customer-search',
    template
}).Class({
    constructor: [
        Http,
        function(http) {
            this.keywords = '';
            this.customers = [];
            this.http = http;
        }
    ],
    ngOnInit() {
        this.search();
    },
    search() {
        if (this.keywords.length < 3) { this.customers = []; return; }
        this.http.get('/customers.json?keywords=' + this.keywords)
            .subscribe((response) => { this.customers = response.json().customers; }, (response) => { console.log(response); });
    }
});

export { CustomerSearchComponent };
