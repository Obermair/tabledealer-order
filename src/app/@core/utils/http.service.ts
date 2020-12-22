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
  }


  findKellnerById(id): Observable<Kellner> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Kellner>(this.SERVER_URL + '/api/kellner/' + id, { headers: headers });
    }
  }

  findVeranstalterById(id): Observable<Veranstalter> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Veranstalter>(this.SERVER_URL + '/api/veranstalter/' + id, { headers: headers });
    }
  }

  getToken(kellner: Kellner): Observable<string>{
    return this.http.post(this.SERVER_URL + '/api/kellner/jwt', kellner, {responseType: 'text'});
  }

  printBestellung(id): Observable<Bestellung> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Bestellung>(this.SERVER_URL + '/api/bestellung/print/' + id, { headers: headers });
    }
  }

}
