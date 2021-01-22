import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbAlertModule, NbStepperModule, NbButtonModule, NbAccordionModule, NbInputModule, NbCheckboxModule, NbListModule, NbFormFieldModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { StatusCardComponent } from './status-card/status-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {LOCALE_ID} from '@angular/core';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbIconModule,    
    NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbButtonModule,
    NbAccordionModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,    
    NbCheckboxModule,
    NbListModule,
    NbStepperModule,
    NbAlertModule,
    NbFormFieldModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de' // 'de' for Germany, 'fr' for France ...
   }],
})
export class DashboardModule { 



}
