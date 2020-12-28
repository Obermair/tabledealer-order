import { Component } from '@angular/core';
import { DataService } from 'app/@core/utils/data.service';

@Component({
  selector: 'ngx-two-columns-layout',
  styleUrls: ['./two-columns.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="small">
      </nb-layout-column>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>

    </nb-layout>


    <nb-layout *ngIf="!data.paramInit" windowMode>
      <nb-layout-column>
        <p>Kein Veranstalter angegeben. Das ist eine falsche URL.</p>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class TwoColumnsLayoutComponent {
  constructor(public data: DataService) {
  }
}
