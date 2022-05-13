import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Artikel } from '../models/artikel';
import { Bestellungartikel } from '../models/bestellartikel';
import { Bestellung } from '../models/bestellung';
import { Kellner } from '../models/kellner';
import { Veranstalter } from '../models/veranstalter';
import { HttpService } from './http.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'; 
import { Kategorie } from '../models/kategorie';

interface CardSettings {
  title: string;
  desc: string;
  iconClass: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public veranstalterId: string;
  public veranstalter: Veranstalter;  
  public arikelList: Array<Artikel>;
  public categoryList: Array<Kategorie>;
  public commonStatusCardsSet: CardSettings[];
  public articlesLoaded = false;
  public categoriesLoaded = false;
  public bestellartikel: Bestellungartikel[] = []; 
  public currentBestellung: Bestellung = {
    tischnr: null,
    name: ""
  };

  public sum: number = 0;
  public loginNeeded = false;
  public loginCounter = 0;
  public paramInit = true;
  public bestellArtikelSum = 0;

  username = Date.now();
  connection: WebSocketSubject<any>;

  public defaultKellner: Kellner = {
    id: 1,
    email: 'example@mail.com',
    name: 'Huber',
    passwort: 'passme'
  };
 
  WEBSOCKET_URL = "wss://legacy-api.tabledealer.at/live/";

  constructor(private http: HttpService, private toastrService: NbToastrService,  public router: Router) { }

  setVeranstalter(){
    this.http.findVeranstalterById(this.veranstalterId).subscribe((data) =>{
      this.veranstalter = data;
    })
  }

  checkVeranstalterValid(){
    let requestCheck = new Promise<void>((resolve, reject) => {
      this.http.findVeranstalterById(this.veranstalterId).subscribe((data) =>{
        this.veranstalter = data;
        if(this.veranstalter.selfCheckout == true){
          this.loginNeeded = true;
        }
        else{
          this.loginNeeded = false;
        }
        resolve();
      })
    });

    return requestCheck;
  }

  loadCategoriesByVeranstalter(){
    this.http.findCategoriesByVeranstalter(this.veranstalterId).subscribe((data) =>{
      this.categoryList = data;
      this.categoriesLoaded = true;
    })
  }

  loadArtikelByVeranstalter(){
    this.http.findArtikelByVeranstalter(this.veranstalterId).subscribe((data) =>{
      this.arikelList = data;
      this.articlesLoaded = true;
    })
  }

  showToast(status, text, position) {
    this.toastrService.show('', text, { position, status });
  }

  calcSum(){
    let sum = 0;
    this.bestellartikel.forEach(function (value) {
       sum = sum + value.artikel.preis * value.menge;
    });
    this.sum = sum;
  }

  calcSumOfBestellArray(ba: Bestellungartikel[]){

    let sum = 0;
    ba.forEach(function (value) {
       sum = sum + value.artikel.preis * value.menge;
    });
    
    return sum;
  }

  pushBestellartikel(article: Artikel){
    let a = this.bestellartikel.findIndex(item => item.artikel.name === article.name)
    this.bestellArtikelSum++;

    if(a != -1){
      this.bestellartikel[a].menge++;
    } else{
      let bestellartikel: Bestellungartikel = {
        artikel: article,
        bestellung: this.currentBestellung,
        menge: 1
      };

      this.bestellartikel.push(bestellartikel);
    }

    this.calcSum();     
  }

  popBestellartikel(article: Artikel){
    let a = this.bestellartikel.findIndex(item => item.artikel.name === article.name)
    this.bestellArtikelSum--;

    if(a != -1){
      if(this.bestellartikel[a].menge == 1){
        this.bestellartikel.splice(a, 1);
      }
      else{
        this.bestellartikel[a].menge--;
      }
    }  
  }

  authenticateForFree(){
    let authRequest = new Promise<void>((resolve, reject) => {
      this.http.getToken(this.defaultKellner).subscribe(data => {
        localStorage.setItem('token', data.token);
        resolve();
      },
      (err: Error) => {
      });
    });

     
    return authRequest;
  }

  connect(): void {
    this.connection = webSocket({
      url: this.WEBSOCKET_URL + this.username,
      deserializer: msg => msg.data
    });
    this.connection.subscribe((value: String) => {
      if(value.includes("block")){
        window.location.reload();
      }
    });
  }

  send(message: string): void {
    this.connection.next(message);
  }

  disconnect(): void {
    if (this.connection) {
      this.connection.complete();
      this.connection = null;
    }
  }
}
