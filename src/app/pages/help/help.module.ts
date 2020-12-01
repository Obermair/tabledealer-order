import { NgModule } from '@angular/core';
import { NbCardModule, NbAccordionModule, NbIconModule, NbButtonModule, NbInputModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { HelpComponent } from './help.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbAccordionModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule
  ],
  declarations: [
    HelpComponent,
  ],
})
export class HelpModule { }
