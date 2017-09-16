import { Component } from '@angular/core';
import { Http } from '@angular/http';

const CustomerSearchComponent = Component({
    selector: 'shine-customer-search',
    template: `
    <header>
        <h1 class="h2">Customer Search</h1>
    </header>
    <section class="search-form">
        <form>
            <label for="keywords" class="sr-only">Keywords</label>
            <input type="text" id="keywords" name="keywords" placeholder="First Name, Last Name, or Email Address" class="form-control input-lg" bindon-ngModel="keywords" on-ngModelChange="search()">
        </form>
    </section>
    <section class="search-results" *ngIf="customers">
        <header>
            <h1 class="h3">Results</h1>
        </header>
        <ol class="list-group">
            <li *ngFor="let c of customers" class="list-group-item">
                <h3 class="pull-right"><small class="text-uppercase">Joined </small>{{ c.created_at }}</h3>
                <h2 class="h3">{{ c.first_name + ' ' + c.last_name }}<small> {{ c.username }}</small></h2>
                <h4>{{ c.email }}</h4>
            </li>
        </ol>
    </section>
    `
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
