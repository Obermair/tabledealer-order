import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./data.service";
import { Artikel } from "../data/article";
import { Veranstalter } from "../data/organizer";

@Injectable({
  providedIn: "root",
})
export class HttpService {

  SERVER_URL = "http://localhost:8080/api/";

  constructor(public http: HttpClient, public data: DataService) {}

  getCustomer(): Observable<Veranstalter> {
    return this.http.get<Veranstalter>(
      this.SERVER_URL + "customer/" + this.data.veranstalter.id
    );
  }

  getArtikelList(): Observable<Artikel[]> {
    return this.http.get<Artikel[]>(this.SERVER_URL + 'artikel/byVeranstalter/' + this.data.veranstalter.id);
  }

/*
  updateCustomer(cust: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      this.SERVER_URL + "customer/" + this.data.customerid,
      cust
    );
  }

  createCustomer(cust: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.SERVER_URL + "customer", cust);
  }*/

  /*getReservations(): Observable<Reservation> {
return this.http.get<Reservation>('reservation/customer' + this.data.customerid);
}*/
/*
  getReservationList(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      this.SERVER_URL + "reservation/customer/" + this.data.customerid
    );
  }

  deleteReservation(id): Observable<any> {
    return this.http.delete(this.SERVER_URL + "reservation/" + id);
  }*/
}
