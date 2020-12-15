import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
        <nb-icon icon=""></nb-icon>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ desc }}</div>
      </div>
      <div class="item-select">
        <nb-icon icon="plus"></nb-icon>
      </div>
      
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() desc: string;
  @Input() type: string;
  @Input() on = true;
}
