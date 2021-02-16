/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './@core/utils/data.service';
import { RouteStateService } from './@core/utils/route-state.service';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  pathParam: Observable<string>;

  constructor(private routeStateService: RouteStateService, private data: DataService, private route: ActivatedRoute, public router: Router){

    this.routeStateService.pathParam.subscribe((res: number)=> {
    
      if(res != null){
        let routeId = res.toString();

        if(localStorage.getItem('veranstalter_id') != routeId){
          this.data.veranstalterId = routeId;
          this.data.paramInit = true;
          localStorage.setItem('veranstalter_id', this.data.veranstalterId)
          
          this.data.authenticateForFree().then(() => {
            this.data.checkVeranstalterValid().then(() => {
              localStorage.removeItem('token')
  
              if(this.data.loginNeeded) {
                this.router.navigate(['/login']);
              }
              else{
                this.router.navigate(['/pages/dashboard']);
              }
            });
          })
  
          
        }
        else{
          this.data.veranstalterId = localStorage.getItem('veranstalter_id');
          this.data.paramInit = true;
          
          this.data.authenticateForFree().then(() => {
            this.data.checkVeranstalterValid().then(() => {
              localStorage.removeItem('token')
  
              if(this.data.loginNeeded && this.data.loginCounter == 0) {
                this.router.navigate(['/login']);
              }
              else{
                this.router.navigate(['/pages/dashboard']);
              }
            });
          })

        }
      }
      else{
        if(localStorage.getItem('veranstalter_id')){
          this.data.veranstalterId = localStorage.getItem('veranstalter_id');
          this.data.paramInit = true;
  
          this.data.authenticateForFree().then(() => {
            this.data.checkVeranstalterValid().then(() => {
              localStorage.removeItem('token')
  
              if(this.data.loginNeeded && this.data.loginCounter == 0) {
                this.router.navigate(['/login']);
              }
              else{
                this.router.navigate(['/pages/dashboard']);
              }
            });
          })
        }
        else{
          this.data.paramInit = false;
        }
      }
    })
  }

  ngOnInit(): void {
  }
}
