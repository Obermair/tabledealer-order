import { NgModule } from '@angular/core';
import { NbCardModule, NbAccordionModule, NbIconModule, NbButtonModule, NbInputModule, NbListModule, NbSelectModule, NbCheckboxModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { BagComponent } from './bag.component';
import { BagItemComponent } from './bag-item/bag-item.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,    
    NbCheckboxModule,
    NbListModule,
    NbSelectModule
  ],
  declarations: [
    BagComponent,    
    BagItemComponent
  ],
})
export class BagModule { }
