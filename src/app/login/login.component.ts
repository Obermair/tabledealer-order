import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kellner } from 'app/@core/models/kellner';
import { Veranstalter } from 'app/@core/models/veranstalter';
import { DataService } from 'app/@core/utils/data.service';
import { HttpService } from 'app/@core/utils/http.service';
import { RouteStateService } from 'app/@core/utils/route-state.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(private routeStateService: RouteStateService, private route: ActivatedRoute, public data: DataService, private http: HttpService, public router: Router) { }


  ngOnInit(): void {
    this.routeStateService.pathParam.next(this.route.snapshot.queryParamMap.get('veranstalter'))
  }

  authenticate(){
    let kellner: Kellner = {
      email: this.email,
      passwort: this.password
    };
   
    this.http.getToken(kellner).subscribe(data => {
        localStorage.setItem('token', data.token);
  
        this.data.showToast('success', 'Erfolgreich eingeloggt.', 'bottom-end');
        this.data.loginCounter++;
        this.router.navigate(['/pages/dashboard']);
      },
      (err: Error) => {
        this.data.showToast('danger', 'Kellner nicht registriert.', 'bottom-end');
      });
    };
  }


