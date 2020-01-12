import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLogged: boolean;
  statusChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    if (username !== '' && password !== '') {
      return this.http.post(`${environment.apiUrl}authentication/login/`, {
        username,
        password,
      });
    }
  }

  logout() {
    return this.http.post(`${environment.apiUrl}authentication/logout/`, { token: this.getToken() });
  }

  getUser(token: string) {
    const data = { token };
    return this.http.post(`${environment.apiUrl}authentication/getuser/`, data);
  }

  getToken() {
    const cookies = document.cookie.split('; ');
    let token = '';
    console.log(cookies);
    console.log(document.cookie);
    cookies.forEach((c) => {
      const cs = c.split('=');
      if (cs[0] === 'sessionid' && cs[1]) {
        token = cs[1];
      }
    });
    return token;
  }

  setToken(token: string) {
    document.cookie = 'sessionid=' + token + ';';
  }

  removeToken() {
    document.cookie = 'sessionid=;';
  }

  changeLoggedStatus(newStatus: boolean) {
    this.isLogged = newStatus;
    this.statusChanged.emit(this.isLogged);
  }
}
