import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'app/@core/utils/data.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private data: DataService, private route: ActivatedRoute){
    if(this.data.veranstalterId == null){
      this.data.veranstalterId = this.route.snapshot.queryParamMap.get('veranstalter');

      if(this.route.snapshot.queryParamMap.get('veranstalter') == null){
        this.data.paramInit = false;
      }
      else{
        this.data.paramInit = true;
      }
    }
  }
}
