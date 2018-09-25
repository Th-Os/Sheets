import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userLoggedIn = false;

  constructor(private router: Router,
              private authService: AuthenticationService
              ) {
    this.authService.checkIfUserIsLoggedIn();

    this.authService.isUserloggedIn.subscribe(isHe => this.userLoggedIn = isHe);
    if (this.userLoggedIn) {
      this.router.navigateByUrl('/courses');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  goToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  logout(): void {
    this.authService.logoutUser();
    this.userLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
