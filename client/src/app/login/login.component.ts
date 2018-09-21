import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginValid = true;

  constructor(private router: Router,
              private authService: AuthenticationService
              ) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.loginUser(this.username, this.password).then(userId => {
      this.loginValid = true;
      this.router.navigateByUrl('/courses');
    },
      err => {
      this.loginValid = false;
      });
  }

  skipLogin(): void {
    this.router.navigateByUrl('/courses');
  }

}
