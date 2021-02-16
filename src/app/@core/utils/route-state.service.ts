import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {

  pathParam = new Subject();

  constructor() {   
  }

}
