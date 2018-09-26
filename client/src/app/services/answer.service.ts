import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageSnackbarService} from "../message-snackbar.service";
import {Observable, of} from "rxjs";
import {Answer} from "../models/answer";
import {Solution} from "../models/solution";
import {catchError, tap} from "rxjs/operators";
import {Sheet} from "../models/sheet";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private submissionsUrl = 'http://localhost:3000/submissions';
  private answersUrl = 'http://localhost:3000/answers';

  constructor(
    private http: HttpClient,
    private messageSnackbarService: MessageSnackbarService
  ) { }

  getAnswer(submission_id: string, task_id: string): Observable<Answer>{
    const url = `${this.submissionsUrl}/${submission_id}/answers/search?task_id=${task_id}`;
    return this.http.get<Answer>(url).pipe(
      catchError(this.handleError<Answer>(`getAnswer of Submission with id=${submission_id} for Task with id=${task_id}`))
    );
  }

  getAnswers(submissionId: any): Observable<Answer[]> {
    const url = `${this.submissionsUrl}/${submissionId}/answers`;
    return this.http.get<Answer[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Answer[]>('getAnswers', []))
      );
  }

  updateAnswer(answer: Answer): Observable<Answer> {
      return this.http.put<Answer>(this.answersUrl + '/' + answer._id, answer, httpOptions).pipe(
        tap(_ => this.log(`Korrektur gespeichert!`)),
        catchError(this.handleError<any>('updateSheet')))
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AnswerService message with the MessageService */
  private log(message: string) {
    this.messageSnackbarService.show(`AnswerService: ${message}`);
  }

}
