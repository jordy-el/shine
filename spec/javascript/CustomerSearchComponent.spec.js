import './SpecHelper'
import { CustomerSearchComponent } from 'CustomerSearchComponent'
import td from "testdouble/dist/testdouble";

let component = null;

describe('CustomerSearchComponent', function() {
  beforeEach(function() {
    component = new CustomerSearchComponent;
  });
  describe('initial state', function() {
    it('sets customers to empty array', function() {
      expect(component.customers.constructor).toBe(Array);
      expect(component.customers.length).toBe(0);
    });
    it('sets keywords to empty string', function() {
      expect(component.keywords).toBe('');
    });
  });
  describe('search', function() {
    let mockHttp = null;
    beforeEach(function() {
      mockHttp = td.object(['get']);
      component = new CustomerSearchComponent(mockHttp);
    });
    describe('A search for "pa", less than three characters', function() {
      it('sets the keywords to be "pa"', function() {
        component.keywords = 'pa';
        expect(component.keywords).toBe('pa');
      });
      it('does not make a HTTP call', function() {
        component.keywords = 'pa';
        component.search();
        td.verify(mockHttp.get(), { times: 0 })
      });
    });
    describe('A search for "pat", three or more characters', function() {
      let mockHttp = null;
      const customers = [
        {
          id: 1,
          created_at: (new Date()).toString(),
          first_name: 'Pat',
          last_name: 'Jones',
          username: 'pj',
          email: 'pjones@somewhere.net'
        },
        {
          id: 2,
          created_at: (new Date()).toString(),
          first_name: 'Pat',
          last_name: 'Jones',
          username: 'pj',
          email: 'pjones@somewhere.net'
        }
      ];
      beforeEach(function() {
        const response = td.object(['json']);
        td.when(response.json()).thenReturn({ customers: customers });

        const observable = td.object(['subscribe']);
        td.when(observable.subscribe(td.callback(response), td.matchers.isA(Function))).thenReturn();

        mockHttp = td.object(['get']);
        td.when(mockHttp.get('/customers.json?keywords=pat')).thenReturn(observable);

        component = new CustomerSearchComponent(mockHttp);
      });
      describe('A successful search', function() {
        it('sets the keywords to be "pat"', function() {
          component.keywords = 'pat';
          expect(component.keywords).toBe('pat');
        });
        it('sets the customers to the result of the HTTP call', function() {
          component.keywords = 'pat';
          component.search();
          expect(component.customers).toBe(customers);
        });
      });
      describe('A search that fails on the back-end', function() {
        let response;
        beforeEach(function() {
          response = td.object(['json']);
          td.when(response.json()).thenReturn({ customers: customers });

          const observable = td.object(['subscribe']);
          td.when(observable.subscribe(td.matchers.isA(Function), td.callback(response))).thenReturn();

          mockHttp = td.object(['get']);
          td.when(mockHttp.get('/customers.json?keywords=pat')).thenReturn(observable);

          component = new CustomerSearchComponent(mockHttp);
        });
        it('sets the keywords to be "pat"', function() {
          component.keywords = 'pat';
          expect(component.keywords).toBe('pat');
        });
        it('leaves the customers as empty array', function() {
          component.keywords = 'pat';
          component.search();
          expect(component.customers.length).toBe(0);
        });
        it('logs response to the console', function() {
          td.replace(console, 'log');
          component.keywords = 'pat';
          component.search();
          td.verify(console.log(response));
        });
      })
    });
  });
});
