import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageSnackbarService } from "../message-snackbar.service";
import { Observable, of } from "rxjs";
import { Sheet } from "../classes/sheet";
import { catchError, tap } from "rxjs/operators";

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
              private messageSnackbarService: MessageSnackbarService) { }

  /*getSheets (): Observable<Sheet[]> {
    return this.http.get<Sheet[]>(this.sheetsUrl)
      .pipe(
        catchError(this.handleError('getSheets', []))
      );
  }*/

  getSheets(id: string): Observable<Sheet[]> {
    const url = `${this.coursesUrl}/${id}/sheets`;
    return this.http.get<Sheet[]>(url)
      .pipe(
        catchError(this.handleError('getSheets', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getSheet(id: string): Observable<Sheet> {
    const url = `${this.sheetsUrl}/${id}`;
    return this.http.get<Sheet>(url).pipe(
      catchError(this.handleError<Sheet>(`getSheet id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  /*updateSheet (sheet: Sheet): Observable<any> {
    console.log('Service: update sheet: ' + sheet.name);
    return this.http.put<Sheet>(this.sheetsUrl + '/' + sheet._id, sheet, httpOptions).pipe(
      tap(_ => this.log(`updated sheet id=${sheet._id}`)),
      catchError(this.handleError<any>('updateSheet'))
    );
  }*/

  /** .subscribe necessary, otherwise put request wont be sent */
  updateSheet (sheet: Sheet): Sheet {
    let updatedSheet = new Sheet();
    this.http.put<Sheet>(this.sheetsUrl + '/' + sheet._id, sheet, httpOptions).pipe(
      tap(_ => this.log(`updated sheet id=${sheet._id}`)),
      catchError(this.handleError<any>('updateSheet')))
      .subscribe(res => updatedSheet = res);
    return updatedSheet;
  }

  /** POST: add a new hero to the server */
  addSheet (courseId: string, sheet: Sheet): Observable<Sheet> {
    const url = `${this.coursesUrl}/${courseId}/sheets`;
    return this.http.post<Sheet>(url, sheet, httpOptions).pipe(
      tap((newSheet: Sheet) => this.log(`created sheet id=${newSheet[0]._id}`)),
      catchError(this.handleError<Sheet>('addSheet'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteSheet (sheet: Sheet | number): Observable<Sheet> {
    const id = typeof sheet === 'number' ? sheet : sheet._id;
    const url = `${this.sheetsUrl}/${id}`;

    return this.http.delete<Sheet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Sheet id=${id}`)),
      catchError(this.handleError<Sheet>('deleteSheet'))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageSnackbarService.show(`SheetService: ${message}`);
  }
}
