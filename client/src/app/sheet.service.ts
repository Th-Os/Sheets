import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageSnackbarService } from "./message-snackbar.service";
import { Observable, of } from "rxjs";
import { Sheet } from "./models/sheet";
import { catchError, tap } from "rxjs/operators";
import {Submission} from "./models/submission";
import {Exercise} from "./models/exercise";
import {Task} from './models/task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SheetService {

  private sheetsUrl = 'http://localhost:3000/sheets';

  constructor(private http: HttpClient,
    private messageSnackbarService: MessageSnackbarService) { }


  /** GET sheet by id. Will 404 if id not found */
  getSheet(id: string): Observable<Sheet> {
    const url = `${this.sheetsUrl}/${id}`;
    return this.http.get<Sheet>(url).pipe(
      catchError(this.handleError<Sheet>(`getSheet id=${id}`))
      );
  }

  getSheetExercises(id: string): Observable<Exercise[]> {
    const url = `${this.sheetsUrl}/${id}/exercises`;
    return this.http.get<Exercise[]>(url)
      .pipe(
        catchError(this.handleError(`getSheetExercises id=${id}`, []))
      );
  }

  getSheetTasks(id: string): Observable<Task[]> {
    const url = `${this.sheetsUrl}/${id}/tasks`;
    return this.http.get<Task[]>(url)
      .pipe(
        catchError(this.handleError(`getSheetTasks id=${id}`, []))
      );
  }

  getSheetSubmissions(id: string): Observable<Submission[]> {
    const url = `${this.sheetsUrl}/${id}/submissions`;
    return this.http.get<Submission[]>(url)
      .pipe(
        catchError(this.handleError(`getSheetSubmissions id=${id}`, []))
    );
  }

  /** PUT: update the sheet on the server */
  updateSheet (sheet: Sheet): Observable<any> {
    const url = `${this.sheetsUrl}/${sheet._id}`;
    return this.http.put(url, sheet, httpOptions).pipe(
      tap(_ => this.log(`updated sheet id=${sheet._id}`)),
      catchError(this.handleError<any>('updateSheet'))
      );
  }

  /** POST: add a new sheet to the server */
  addSheet (sheet: Sheet): Observable<Sheet> {
    return this.http.post<Sheet>(this.sheetsUrl, sheet, httpOptions).pipe(
      tap(_ => this.log(`created sheet id=${sheet._id}`)),
      catchError(this.handleError<Sheet>('addSheet'))
      );
  }

  /** DELETE: delete the sheet from the server */
  deleteSheet (sheet: Sheet): Observable<Sheet> {
    const url = `${this.sheetsUrl}/${sheet._id}`;
    return this.http.delete<Sheet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Sheet id=${sheet._id}`)),
      catchError(this.handleError<Sheet>('deleteSheet'))
      );
  }

  getSubmissionTemplate(id: String): Observable<any> {
    const url = `${this.sheetsUrl}/${id}/template`;
    return this.http.get(url).pipe(
      catchError(this.handleError(`getTemplate id=${id}`))
      );
  }

  deleteSubmissions (sheet: Sheet): Observable<any> {
    const url = `${this.sheetsUrl}/${sheet._id}/submissions/`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Submissions of Sheet id=${sheet._id}`)),
      catchError(this.handleError('deleteSubmissions'))
      );
  }

  autocorrectSubmission(submission: Submission): Observable<any> {
    const url = `${this.sheetsUrl}/correct/`
    return this.http.post<Submission>(url, submission, httpOptions).pipe(
      tap(_ => this.log(`submissions corrected`)),
      catchError(this.handleError<Sheet>('autocorrectSubmissions'))
      );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SheetService message with the MessageService */
  private log(message: string) {
    this.messageSnackbarService.show(`SheetService: ${message}`);
  }
}
