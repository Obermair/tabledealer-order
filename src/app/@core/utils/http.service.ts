import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "./data.service";
import { Kellner } from "../models/kellner";
import { Veranstalter } from "../models/veranstalter";
import { Bestellung } from "../models/bestellung";
import { Artikel } from "../models/artikel";
import { Bestellungartikel } from "../models/bestellartikel";

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


  findArtikelByVeranstalter(id: string): Observable<Artikel[]> {
    let token = localStorage.getItem('token');

    console.log(id)

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Artikel[]>(this.SERVER_URL + '/api/artikel/byVeranstalter/' + id, { headers: headers });
    }
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

  
  postBestellung(bestellung: Bestellung): Observable<Bestellung>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Bestellung>(this.SERVER_URL + '/api/bestellung', bestellung, { headers: headers });
    }
  }
  
  postBestellungartikel(ba: Bestellungartikel): Observable<Bestellungartikel>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Bestellungartikel>(this.SERVER_URL + '/api/bestellartikel', ba, { headers: headers });
    }
  }

  printBestellung(id): Observable<Bestellung> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Bestellung>(this.SERVER_URL + '/api/bestellung/print/' + id, { headers: headers });
    }
  }
}
