import { Component, Input } from '@angular/core';
import { Artikel } from 'app/@core/models/Artikel';
import { DataService } from 'app/@core/utils/data.service';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card>
      <div class="details">
        <div class="title ml-2 h5">{{ title }}</div>
        <div class="status ml-2 paragraph-2">{{ desc }}</div>
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
  @Input() type: string;
  @Input() article: Artikel;
  @Input() on = true;

  constructor(public data: DataService){
  }

  amount = 0;

  incAmount(){
    if(this.amount < 15) {
      this.data.pushBestellartikel(this.article);
      this.data.showToast('success', this.article.name + " hinzugefügt.", 'bottom-end');
      this.amount += 1;
    }
  }

  decAmount(){
    if(this.amount > 0) {
      this.data.popBestellartikel(this.article);
      this.data.showToast('danger', this.article.name + " entfernt.", 'bottom-end');
      this.amount -= 1;
    }
  }
}
