import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbAlertModule, NbStepperModule, NbButtonModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { StatusCardComponent } from './status-card/status-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbIconModule,    
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbButtonModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
  ],
})
export class DashboardModule { 



}
