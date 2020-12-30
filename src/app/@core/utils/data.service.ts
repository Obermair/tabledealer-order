import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Artikel } from '../models/Artikel';
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
  public veranstalterId: string = null;
  public veranstalter: Veranstalter;  
  public arikelList: Array<Artikel>;
  public commonStatusCardsSet: CardSettings[];
  public bestellartikel: Bestellungartikel[] = []; 
  public currentBestellung: Bestellung = {
    tischnr: 13
  };

  public paramInit = false;

  public defaultKellner: Kellner = {
    id: 1,
    email: 'example@mail.com',
    name: 'Huber',
    passwort: 'passme'
  };
 
  constructor(private http: HttpService, private toastrService: NbToastrService) { }

  setVeranstalter(id){
    this.http.findVeranstalterById(id).subscribe((data) =>{
      this.veranstalter = data;
    })
  }

  loadArtikelByVeranstalter(){
    this.http.findArtikelByVeranstalter(this.veranstalterId).subscribe((data) =>{
      this.arikelList = data;
      console.log(this.arikelList);
    })
  }

  showToast(status, text, position) {
    this.toastrService.show('', text, { position, status });
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
}
