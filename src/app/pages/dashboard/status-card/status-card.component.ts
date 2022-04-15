import { Component, Input } from '@angular/core';
import { Artikel } from 'app/@core/models/artikel';
import { DataService } from 'app/@core/utils/data.service';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/fr';
registerLocaleData(localeDe, 'de');

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card>
      <div class="details">
        <div class="title ml-2 h5">{{ title }}</div>
        <div class="status ml-2 paragraph-2">{{ price | currency:'EUR':'symbol':'1.2-2':'de' }}</div>
      </div>
      <div>

      <nb-form-field class="mr-4">
        <nb-icon (click)="decAmount()" nbPrefix icon="minus-outline" pack="eva"></nb-icon>
        <input class="amount" [(ngModel)]="amount" nbInput>
        <nb-icon (click)="incAmount()" nbSuffix icon="plus-outline" pack="eva"></nb-icon>
      </nb-form-field>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() desc: string;
  @Input() price : number;
  @Input() type: string;
  @Input() article: Artikel;
  @Input() on = true;

  constructor(public data: DataService){
  }

  amount = 0;
  incAmount(){
    if(this.amount < 15) {
      this.data.pushBestellartikel(this.article);
      this.amount += 1;
    }   
  }

  decAmount(){
    if(this.amount > 0) {
      this.data.popBestellartikel(this.article);
      this.amount -= 1;
    }
  }
  
}
