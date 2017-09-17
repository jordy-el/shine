import './SpecHelper';
import { CustomerDetailsComponent } from 'CustomerDetailsComponent';
import td from 'testdouble/dist/testdouble';

let component = null;

describe('CustomerDetailsComponent', function() {
  describe('initial state', function() {
    beforeEach(function() {
      component = new CustomerDetailsComponent;
    });
    it('sets customer to null', function() {
      expect(component.customer).toBe(null);
    })
  });
  describe('ngOnInit', function() {
    const customer = {
      id: 1,
      created_at: (new Date()).toString(),
      first_name: 'Pat',
      last_name: 'Jones',
      username: 'pj',
      email: 'pjones@somewhere.net'
    };
    const createMockHttp = function(customer) {
      const response = td.object(['json']);
      td.when(response.json()).thenReturn({ customer: customer });

      const observable = td.object(['subscribe']);
      td.when(observable.subscribe(td.callback(response), td.matchers.isA(Function))).thenReturn();

      const mockHttp = td.object(['get']);
      td.when(mockHttp.get(`/customers/${customer.id}.json`)).thenReturn(observable);

      return mockHttp;
    };
    const createMockRoute = function(id) {
      const observable = td.object(['subscribe']);
      const routeParams = { id: id };
      const mockActivatedRoute = { params: observable };

      td.when(observable.subscribe(td.callback(routeParams), td.matchers.isA(Function))).thenReturn();

      return mockActivatedRoute;
    };
    beforeEach(function() {
      const route = createMockRoute(customer.id);
      const http = createMockHttp(customer);
      component = new CustomerDetailsComponent(route, http)
    });
    it('fetches the customer from the backend', function() {
      component.ngOnInit();
      expect(component.customer).toBe(customer);
    })
  })
});

