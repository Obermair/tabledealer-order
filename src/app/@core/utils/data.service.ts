import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Artikel } from '../models/artikel';
import { Bestellungartikel } from '../models/bestellartikel';
import { Bestellung } from '../models/bestellung';
import { Kellner } from '../models/kellner';
import { Veranstalter } from '../models/veranstalter';
import { HttpService } from './http.service';

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
  public veranstalterId: string = '1';
  public veranstalter: Veranstalter;  
  public arikelList: Array<Artikel>;
  public commonStatusCardsSet: CardSettings[];
  public bestellartikel: Bestellungartikel[] = []; 
  public currentBestellung: Bestellung = {
    tischnr: 13,
    name: 'Huber'
  };
  public sum: number = 0;

  public paramInit = false;

  public defaultKellner: Kellner = {
    id: 1,
    email: 'example@mail.com',
    name: 'Huber',
    passwort: 'passme'
  };
 
  constructor(private http: HttpService, private toastrService: NbToastrService) { }

  setVeranstalter(){
    this.http.findVeranstalterById(this.veranstalterId).subscribe((data) =>{
      this.veranstalter = data;
    })
  }

  loadArtikelByVeranstalter(){
    this.http.findArtikelByVeranstalter(this.veranstalterId).subscribe((data) =>{
      this.arikelList = data;
    })
  }



  showToast(status, text, position) {
    this.toastrService.show('', text, { position, status });
  }

  calcSum(){
    let sum = 0;
    this.bestellartikel.forEach(function (value) {
      console.log(value.artikel.preis);
       sum = sum + value.artikel.preis * value.menge;
    });
    this.sum = sum;
  }

  pushBestellartikel(article: Artikel){
    let a = this.bestellartikel.findIndex(item => item.artikel.name === article.name)

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
      this.http.getToken(this.defaultKellner).subscribe(result => {
        if ( result ) {
          if(result == "user not found"){
            //this.data.showToast('top-right', 'danger', 'User nicht registriert');
          }
          else{
            localStorage.setItem('token', result);
            this.showToast('primary', 'Automatisch eingeloggt', 'bottom-right')
          }
        }
        resolve();
      });
    });

    return authRequest;
  }
}
