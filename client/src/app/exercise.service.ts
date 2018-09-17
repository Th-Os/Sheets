import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageSnackbarService} from "./message-snackbar.service";
import {Observable, of} from "rxjs";
import {Task} from "./models/task";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exercisesUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService) { }

  getExerciseTasks(id: string): Observable<Task[]> {
    const url = `${this.exercisesUrl}/${id}/tasks`;
    return this.http.get<Task[]>(url)
      .pipe(
        catchError(this.handleError(`getExerciseTasks id=${id}`, []))
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

  /** Log a ExerciseService message with the MessageService */
  private log(message: string) {
    this.messageSnackbarService.show(`ExerciseService: ${message}`);
  }
}
