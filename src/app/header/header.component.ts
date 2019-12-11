import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.statusChanged.subscribe(res => {
      this.isLogged = res;
    });
  }
}
