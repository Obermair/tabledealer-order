import {Injectable} from '@angular/core';
import {Customer} from '../models/customer.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  SERVER_URL = 'http://localhost:8080/api/';

  constructor(public http: HttpClient,
              public data: DataService) {
  }

  getCustomer(): Observable<Customer> {
    return this.http.get<Customer>(this.SERVER_URL + 'customer/' + this.data.customerid);
  }

  updateCustomer(cust: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.SERVER_URL + 'customer/' + this.data.customerid, cust);
  }

  createCustomer(cust: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.SERVER_URL + 'customer', cust);
  }

  /*getReservations(): Observable<Reservation> {
    return this.http.get<Reservation>('reservation/customer' + this.data.customerid);
  }*/
}
