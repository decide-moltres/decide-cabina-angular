import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationnService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    if (username !== '' && password !== '') {
      return this.http.post('http://localhost:8000/authentication/login/', {
        username,
        password,
      });
    }
  }

  logout() {
    return this.http.post('http://localhost:8000/authentication/logout/', { token: this.getToken() });
  }

  getUser(token: string) {
    const data = { token };
    return this.http.post('http://localhost:8000/authentication/getuser/', data);
  }

  getToken() {
    const cookies = document.cookie.split('; ');
    let token = '';
    cookies.forEach((c) => {
      const cs = c.split('=');
      if (cs[0] === 'decide' && cs[1]) {
        token = cs[1];
      }
    });
    return token;
  }

  setToken(token: string) {
    document.cookie = 'decide=' + token + ';';
  }

  removeToken() {
    document.cookie = 'decide=;';
  }
}
