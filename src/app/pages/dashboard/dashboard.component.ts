import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from 'rxjs/operators' ;
import { timingSafeEqual } from "crypto";
import { HttpService } from "../../@core/utils/http.service";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { DataService } from "app/@core/utils/data.service";
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

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private toastrService: NbToastrService, private themeService: NbThemeService, private http: HttpService, 
    private data: DataService,private fb: FormBuilder) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });
  }
  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  printSampleBestellung(){
    this.http.printBestellung(1);
  }

  authenticateForFree(){
      this.http.getToken(this.data.defaultKellner)
      
      this.http.getToken(this.data.defaultKellner).subscribe(result => {
        if ( result ) {
          if(result == "user not found"){
            //this.data.showToast('top-right', 'danger', 'User nicht registriert');
          }
          else{
            //localStorage.setItem('token', result);
  
            //this.router.navigate(['/app'])
          }
        }
      });
  }

  addArticle(){
    this.showToast('success');
  }

  showToast(status) {
    this.toastrService.show('', `Artikel hinzugefügt`, { status });
  }
}
