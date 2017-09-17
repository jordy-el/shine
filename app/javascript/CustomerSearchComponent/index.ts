import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import template from './template.html';

const CustomerSearchComponent = Component({
  selector: 'shine-customer-search',
  template
}).Class({
  constructor: [
    Http,
    Router,
    function(http, router) {
      this.keywords = '';
      this.customers = [];
      this.http = http;
      this.router = router;
    }
  ],
  viewDetails(customer) {
    this.router.navigate(['/', customer.id]);
  },
  search() {
    if (this.keywords.length < 3) {
      this.customers = [];
      return;
    }
    this.http.get('/customers.json?keywords=' + this.keywords)
      .subscribe((response) => {
        this.customers = response.json().customers;
      }, (response) => {
        console.log(response);
      });
  }
});

export { CustomerSearchComponent };
