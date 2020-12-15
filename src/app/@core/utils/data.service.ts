import { Injectable } from '@angular/core';

import { Artikel } from '../data/article';
import { Veranstalter } from '../data/organizer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public veranstalter: Veranstalter;  
  public arikelList: Array<Artikel>;
 
  constructor() { }
}
