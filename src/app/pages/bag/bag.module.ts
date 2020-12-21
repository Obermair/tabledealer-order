import { NgModule } from '@angular/core';
import { NbCardModule, NbAccordionModule, NbIconModule, NbButtonModule, NbInputModule, NbListModule, NbSelectModule, NbCheckboxModule, NbStepperModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { BagComponent } from './bag.component';
import { BagItemComponent } from './bag-item/bag-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbAccordionModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,    
    NbCheckboxModule,
    NbListModule,
    NbStepperModule,
    NbSelectModule
  ],
  declarations: [
    BagComponent,    
    BagItemComponent
  ],
})
export class BagModule { }
