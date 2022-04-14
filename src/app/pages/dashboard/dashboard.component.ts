import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from 'rxjs/operators' ;
import { HttpService } from "../../@core/utils/http.service";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { DataService } from "app/@core/utils/data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RouteStateService } from "app/@core/utils/route-state.service";
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
  statusCards: string;


 
  constructor(private themeService: NbThemeService, private http: HttpService, 
    private routeStateService: RouteStateService,
    public data: DataService, private route: ActivatedRoute, private router: Router) {
    
    
      this.routeStateService.pathParam.next(this.route.snapshot.queryParamMap.get('veranstalter'))
    
      if(this.data.paramInit){
        
        if(localStorage.getItem('token')){
          this.data.connect();
          this.data.setVeranstalter();
          this.data.loadArtikelByVeranstalter();
        }
        else{
          this.data.authenticateForFree().then(() => {  
            this.data.connect();
            this.data.setVeranstalter();
            this.data.loadArtikelByVeranstalter();
          });
        }
      }
  }


  ngOnDestroy() {
    this.alive = false;
  }

  printSampleBestellung(){
    this.http.printBestellung(1).subscribe(data => {
    });
  }

  navToBag(){
    this.router.navigate(['pages/bag'])
  }
}
