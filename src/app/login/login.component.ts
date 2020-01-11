import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  googleUrl = `${environment.api_url}authentication/oauth/login/google-oauth2?next=http://localhost:4200/`;
  facebookUrl = `${environment.api_url}authentication/oauth/login/facebook?next=http://localhost:4200/`;
  githubUrl = `${environment.api_url}authentication/oauth/login/github?next=http://localhost:4200/`;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(username: string, password: string, event: Event) {
    event.preventDefault();

    this.submitted = true;

    // stop here if form is invalid
    if (username === '' || password === '') {
      return;
    }

    this.loading = true;
    this.authService.login(username, password).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        if (res.hasOwnProperty('token')) {
          this.authService.setToken((res as any).token);
          this.authService.changeLoggedStatus(true);
          this.router.navigate(['']);
        } else {
          this.authService.changeLoggedStatus(false);
        }
      },
      error => {
        this.authService.changeLoggedStatus(false);
        this.loading = false;
      });
  }

}
