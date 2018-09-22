import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageSnackbarService } from "../message-snackbar.service";
import { Observable, of } from "rxjs";
import { Sheet } from "../models/sheet";
import { Submission } from '../models/submission';
import { catchError, tap } from "rxjs/operators";
import { Exercise } from "../models/exercise";
import { TaskService } from "./task.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SheetService {

  private sheetsUrl = 'http://localhost:3000/sheets';
  private coursesUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient,
              private taskService: TaskService,
              private messageSnackbarService: MessageSnackbarService) { }


  getSheets(id: string): Observable<Sheet[]> {
    const url = `${this.coursesUrl}/${id}/sheets`;
    return this.http.get<Sheet[]>(url)
      .pipe(
        catchError(this.handleError('getSheets', []))
      );
  }

  /** GET sheet by id. Will 404 if id not found */
  getSheet(id: string): Observable<Sheet> {
    const url = `${this.sheetsUrl}/${id}`;
    return this.http.get<Sheet>(url).pipe(
      catchError(this.handleError<Sheet>(`getSheet id=${id}`))
    );
  }

  getSheetSubmissions(id: string): Observable<Submission[]> {
    const url = `${this.sheetsUrl}/${id}/submissions`;
    return this.http.get<Submission[]>(url)
      .pipe(
        catchError(this.handleError(`getSheetSubmissions id=${id}`, []))
      );
  }

  getSheetExercises(id: string): Observable<Exercise[]> {
    const url = `${this.sheetsUrl}/${id}/exercises`;
    return this.http.get<Exercise[]>(url)
      .pipe(
        catchError(this.handleError(`getSheetExercises id=${id}`, []))
      );
  }

  /** .subscribe necessary, otherwise put request wont be sent */
  updateSheet (sheet: Sheet): Observable<Sheet> {
    return this.http.put<Sheet>(this.sheetsUrl + '/' + sheet._id, sheet, httpOptions).pipe(
      tap(_ => this.log(`updated sheet id=${sheet._id}`)),
      catchError(this.handleError<any>('updateSheet')))
  }

  /** POST: add a new sheet to the server */
  addSheet (courseId: string, sheet: Sheet): Observable<Sheet> {
    const url = `${this.coursesUrl}/${courseId}/sheets`;
    return this.http.post<Sheet>(url, sheet, httpOptions).pipe(
      tap((newSheet: Sheet) => this.log(`created sheet id=${newSheet[0]._id}`)),
      catchError(this.handleError<Sheet>('addSheet'))
    );
  }

  /** DELETE: delete the sheet from the server */
  deleteSheet (sheet: Sheet | number): Observable<Sheet> {
    const id = typeof sheet === 'number' ? sheet : sheet._id;
    const url = `${this.sheetsUrl}/${id}`;

    return this.http.delete<Sheet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Sheet id=${id}`)),
      catchError(this.handleError<Sheet>('deleteSheet'))
    );
  }

  getSubmissionTemplate(id: String): Observable<any> {
    const url = `${this.sheetsUrl}/${id}/template`;
    return this.http.get(url, {responseType: 'text'}).pipe(
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

  uploadSubmissions (sheet: Sheet): Observable<any> {
    return this.http.post(this.sheetsUrl + '/' + sheet._id + "/submissions/_bulk" , sheet.submissions , httpOptions).pipe(
      tap(_ => this.log(`uploaded submissions id=${sheet._id}`)),
      catchError(this.handleError<any>('uploadSubmissions')))
  }

  updateSubmissions (sheet: Sheet, submissions: Submission[]): Observable<any> {
    return this.http.post(this.sheetsUrl + '/' + sheet._id + "/submissions" , submissions , httpOptions).pipe(
      tap(_ => this.log(`uploaded submissions id=${sheet._id}`)),
      catchError(this.handleError<any>('uploadSubmissions')))
  }

  getSubmissions (sheet: Sheet): Observable<any> {
    const url = `${this.sheetsUrl}/${sheet._id}/submissions/`;
    return this.http.get(url, httpOptions).pipe(
      tap(_ => this.log(`fetched Submissions of Sheet id=${sheet._id}`)),
      catchError(this.handleError('deleteSubmissions'))
    );
  }

  autocorrectSubmissions(sheet: Sheet): Promise<any> {
    const url = `${this.sheetsUrl}/correct/`

    let promises = [];
    sheet.submissions.forEach(sub => {
      promises.push(this.http.post<Submission>(url, sub, httpOptions))
    })

    return Promise.all(promises);
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
