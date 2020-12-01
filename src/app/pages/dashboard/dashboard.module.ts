import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { StatusCardComponent } from './status-card/status-card.component';


@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbIconModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
  ],
})
export class DashboardModule { 



}
