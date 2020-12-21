import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "./data.service";
import { Artikel } from "../data/article";
import { Kellner, Veranstalter, Bestellung } from "../data/organizer";

@Injectable({
  providedIn: "root",
})
export class HttpService {

  SERVER_URL = "https://api.o-zapft.at";
  token;
  headers;
  kellner;

  constructor(public http: HttpClient) {
    this.updateToken();
  }

  updateToken() {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders().set('Authorization', "Bearer " + this.token);
  }

  findKellnerById(id): Observable<Kellner> {
    return this.http.get<Kellner>(this.SERVER_URL + '/api/kellner/' + id, { headers: this.headers });
  }

  findVeranstalterById(id): Observable<Veranstalter> {
    return this.http.get<Veranstalter>(this.SERVER_URL + '/api/veranstalter/' + id, { headers: this.headers });
  }

  getToken(kellner: Kellner): Observable<String>{
    return this.http.post(this.SERVER_URL + '/api/kellner/jwt', kellner, {responseType: 'text'});
  }

  printBestellung(bestellung): Observable<Bestellung> {
    return this.http.get<Bestellung>(this.SERVER_URL + '/api/bestellung/print/' + bestellung.id, { headers: this.headers });
  }

}
