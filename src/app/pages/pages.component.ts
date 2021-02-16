import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'app/@core/utils/data.service';
import { RouteStateService } from 'app/@core/utils/route-state.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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
export class PagesComponent implements OnInit{

  menu = MENU_ITEMS;
  private destroy = new Subject<void>();

  constructor(private routeStateService: RouteStateService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.routeStateService.pathParam.next(this.route.snapshot.queryParamMap.get('veranstalter'))
  }
}
