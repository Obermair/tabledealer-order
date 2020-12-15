import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }    

  login(name: string) {
    const body = {name: name};
    return this.http.post('http://188.68.37.4:8080/api/kellner/jwt', body, {responseType: 'text'})
      .pipe(tap(res => this.setSession(res), shareReplay(1)));
  }

  private setSession(authResult) {
    console.log(authResult);
    localStorage.setItem('id_token', authResult);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
