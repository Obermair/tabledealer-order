import { Injectable } from '@angular/core';
import { Artikel } from '../models/Artikel';
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

  public defaultKellner: Kellner = {
    id: 1,
    email: 'example@mail.com',
    name: 'Huber',
    passwort: 'passme'
  };
 
  constructor(private http: HttpService) { }

  setVeranstalter(id){
    this.http.findVeranstalterById(id).subscribe((data) =>{
      this.veranstalter = data;
    })
  }

  loadArtikelByVeranstalter(){
    this.http.findArtikelByVeranstalter(this.veranstalterId).subscribe((data) =>{
      this.arikelList = data;
    
    })
  }


}
