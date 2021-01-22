import { Component, HostBinding } from "@angular/core";
import { NbThemeService } from '@nebular/theme';
@Component({
  selector: "ngx-about",
  styleUrls: ["./help.component.scss"],
  templateUrl: "./help.component.html",
})
export class HelpComponent {
  
  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}

