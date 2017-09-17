import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import template from './template.html';

const CustomerDetailsComponent = Component({
  selector: 'shine-customer-details',
  template
}).Class({
  constructor: [
    ActivatedRoute,
    Http,
    function(activatedRoute, http) {
      this.activatedRoute = activatedRoute;
      this.http = http;
      this.customer = null;
    }
  ],
  ngOnInit() {
    const observableFailed = (response) => {
      console.log(response);
    };
    const customerGetSuccess = (response) => {
      this.customer = response.json().customer;
    };
    const routeSuccess = (params) => {
      this.http.get(`/customers/${params.id}.json`).subscribe(customerGetSuccess, observableFailed);
    };
    this.activatedRoute.params.subscribe(routeSuccess, observableFailed);
  }
});

export { CustomerDetailsComponent };
