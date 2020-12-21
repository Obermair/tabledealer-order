import { Injectable } from '@angular/core';

import { Artikel } from '../data/article';
import { Veranstalter, Kellner } from '../data/organizer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public veranstalter: Veranstalter;  
  public arikelList: Array<Artikel>;
  public currentKellner: Kellner = {
    id: 1,
    email: 'example@mail.com',
    name: 'Huber',
    passwort: 'passme'
  };
 
  constructor() { }
}
