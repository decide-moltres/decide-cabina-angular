import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  loading: boolean;

  constructor(private authService: AuthenticationService) { }

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
        console.log(res);
        if (res.hasOwnProperty('token')) {
          this.authService.setToken((res as any).token);
          this.authService.changeLoggedStatus(true);
        } else {
          this.authService.changeLoggedStatus(false);
        }
      },
      error => {
        console.error(error);
        this.authService.changeLoggedStatus(false);
        this.loading = false;
      });
  }

}
