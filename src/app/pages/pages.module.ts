import { NgModule } from '@angular/core';
import { NbMenuModule, NbBadgeModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
 
import { BagModule } from './bag/bag.module';
import { HelpModule } from './help/help.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    BagModule,
    HelpModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
