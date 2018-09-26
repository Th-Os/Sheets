import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageSnackbarService } from '../message-snackbar.service';
import { Observable, of } from 'rxjs';

import {Submission} from '../models/submission';
import {catchError, tap} from 'rxjs/internal/operators';
import {Answer} from '../models/answer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private submissionsUrl = 'http://localhost:3000/submissions';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService) { }

  getSubmissionsForUser(userId: string): Observable<Submission[]> {
    const url = `${this.submissionsUrl}/_search?user=${userId}`;
    return this.http.get<Submission[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError('getSubmissionsForUser', []))
      );
  }

  /*updateSubmission(submission: Submission): Observable<any> {
    return this.http.put(`${this.submissionsUrl}/${submission._id}`, httpOptions)
      .pipe(
        tap(_ => this.log(`updated submission id=${submission._id}`)),
        catchError(this.handleError<any>('updateSubmission')));
  }*/

  updateSubmission (submission: any): Submission {
    let updatedSubmission = new Submission();
    this.http.put<Submission>(`${this.submissionsUrl}/${submission._id}`, httpOptions).pipe(
      tap(_ => this.log(`updated submission id=${submission._id}`)),
      catchError(this.handleError<any>('updateSubmission')))
      .subscribe(res => updatedSubmission = res);
    return updatedSubmission;
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
    this.messageSnackbarService.show(`SubmissionService: ${message}`);
  }
}
