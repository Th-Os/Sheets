import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageSnackbarService} from "../message-snackbar.service";
import {Observable, of} from "rxjs";
import {Student} from "../models/student";
import {Sheet} from "../models/sheet";
import {catchError} from "rxjs/operators";
import {Submission} from "../models/submission";

  const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class StudentService {


  private studentsUrl: string = 'http://localhost:3000/students';

  constructor(
    private http: HttpClient,
    private messageSnackbarService: MessageSnackbarService
  ) { }

  getStudentById(mat_nr: string): Observable<Student> {
    const url = `${this.studentsUrl}/_search?matnr=${mat_nr}`;
    return this.http.get<Student>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Student>('getStudentById'))
      );
  }

  getStudent(id): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  getStudentSubmissions(id): Observable<Submission[]> {
    const url = `${this.studentsUrl}/${id}/submissions`;
    return this.http.get<Submission[]>(url, httpOptions).pipe(
      catchError(this.handleError<Submission[]>(`getStudent Submissions id=${id}`))
    );
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StudentService message with the MessageService */
  private log(message: string) {
    this.messageSnackbarService.show(`StudentService: ${message}`);
  }
}
