import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MessageSnackbarService} from '../message-snackbar.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/internal/operators';
import {UserService} from './user.service';
import {User} from '../models/user';

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

  // Todo: See if even necessary to give back userid (should all be saved in local storage)
  loginUser(username: string, password: string): Promise<string> {
    const url = `${this.authUrl}/login`;
    return new Promise<string>((resolve, reject) => {
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
                role: user.role,
                courses: user.courses,
                token: res.token
              };
              localStorage.setItem('currentUser', JSON.stringify(storeUser));
              this.isUserloggedIn.next(true);
              resolve(user._id);
            });
          } else {
            this.isUserloggedIn.next(false);
            reject('error');
          }
        });
    });
  }

  registerUser(username: string, password: string): Observable<void> {
    const url = `${this.authUrl}/register`;
    return new Observable<void>();
  }

  checkIfUserIsLoggedIn(): void {
    if (localStorage.getItem('currentUser') !== null) {
      console.log(localStorage.getItem('currentUser'));
      this.isUserloggedIn.next(true);
    } else {
      this.isUserloggedIn.next(false);
    }
  }

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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageSnackbarService.show(`AuthenticationService: ${message}`);
  }
}
