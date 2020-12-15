import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from 'rxjs/operators' ;
import { timingSafeEqual } from "crypto";
import { HttpService } from "../../@core/mock/http.service";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
interface CardSettings {
  title: string;
  desc: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnDestroy {
  
  
  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Hamburger',
    desc: 'mit Pommes',
    iconClass: '',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Pizza',
    desc: 'mit Salami',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Bier 0.5',
    desc: 'Freistädter',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Kaffee',
    desc: 'Espresso',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
    origin : CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
    origin: this.commonStatusCardsSet,
  };

  constructor(private toastrService: NbToastrService, private themeService: NbThemeService, private http: HttpService
              ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });
    
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addArticle(){
    console.log("Seas");
    this.showToast('success');
  }

  showToast(status) {
    this.toastrService.show('', `Artikel hinzugefügt`, { status });
  }

}
