import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageSnackbarService} from '../message-snackbar.service';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';

import {User} from '../models/user';
import {Role} from '../models/role';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3000/users';
  private roleUrl = 'http://localhost:3000/roles';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService
  ) { }

  // Todo: Implement route in backend
  getUser(userId: string): Observable<User> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.get<User>(url, httpOptions)
      .pipe(
        catchError(this.handleError<User>(`getUser id=${userId}`))
      );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User []>(this.userUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(
        tap((newUser: User) => this.log(`created user id=${newUser[0]._id}`)),
        catchError(this.handleError<User>('addUser'))
      );
  }

  /*updateUser(user: User): User {
    let updatedUser = new User();
    this.http.put<User>(this.userUrl + '/' + user._id, user, httpOptions)
      .pipe(
        tap(_ => this.log(`updated user id=${user._id}`)),
        catchError(this.handleError<any>('updateUser')))
      .subscribe(res => updatedUser = res);
    return updatedUser;
  }*/

  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl + '/' + user._id, user, httpOptions)
      .pipe(
        tap(_ => this.log(`updated user id=${user._id}`)),
        catchError(this.handleError<any>('updateUser')));
  }

  deleteUser(user: User | string): Observable<User> {
    const id = typeof user === 'string' ? user : user._id;
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
      );
  }

  // Todo: Implement in server
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.roleUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getRoles', []))
      );
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
    this.messageSnackbarService.show(`UserService: ${message}`);
  }
}
