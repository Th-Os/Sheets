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

    // Check if user is already logged-in
    this.authService.isUserloggedIn.subscribe(isLoggedIn => this.userLoggedIn = isLoggedIn);

    // If user is logged-in navigate to courses overview, otherwise to login-page
    if (this.userLoggedIn) {
      this.router.navigateByUrl('/courses');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  // Navigate to profile-page
  goToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  // Logout user and navigate back to login-page
  logout(): void {
    this.authService.logoutUser();
    this.userLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
