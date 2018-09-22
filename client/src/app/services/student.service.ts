import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageSnackbarService} from "../message-snackbar.service";
import {Observable, of} from "rxjs";
import {Student} from "../models/student";
import {Sheet} from "../models/sheet";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private studentsUrl: string = 'http://localhost:3000/students';

  constructor(
    private http: HttpClient,
    private messageSnackbarService: MessageSnackbarService
  ) { }

  getStudent(id): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      catchError(this.handleError<Student>(`getStudent id=${id}`))
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
