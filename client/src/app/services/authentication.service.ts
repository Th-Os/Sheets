import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MessageSnackbarService} from '../message-snackbar.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {UserService} from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl = 'http://localhost:3000/auth';
  public isUserloggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService,
              private userService: UserService
  ) { }

  // Send login-data to server for validation. If successful, get user data from db and save it in local storage
  loginUser(username: string, password: string): Promise<boolean> {
    const url = `${this.authUrl}/login`;
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>(url, {username: username, password: password}, httpOptions)
        .pipe(
          catchError(this.handleError<any>('loginUser')))
        .subscribe(res => {
          if (res && res.auth && res.token) {
            this.userService.getUser(res.user).subscribe(user => {
              const storeUser = {
                _id: user._id,
                username: user.username,
                password: user.password,
                forename: user.forename,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                courses: user.courses,
                token: res.token
              };
              localStorage.setItem('currentUser', JSON.stringify(storeUser));
              this.isUserloggedIn.next(true);
              resolve(true);
            });
          } else {
            this.isUserloggedIn.next(false);
            reject('error');
          }
        });
    });
  }

  // Check if some user is logged in
  checkIfUserIsLoggedIn(): void {
    if (localStorage.getItem('currentUser') !== null) {
      this.isUserloggedIn.next(true);
    } else {
      this.isUserloggedIn.next(false);
    }
  }

  // Logout user
  logoutUser(): void {
    localStorage.removeItem('currentUser');
    this.isUserloggedIn.next(false);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageSnackbarService.show(`AuthenticationService: ${message}`);
  }
}
