import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MessageSnackbarService } from "./message-snackbar.service";
import { Observable, of } from "rxjs";
import {Exercise} from './exercise';
import { catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exerciseUrl = 'api/exercises';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService) { }

  getExercises (): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.exerciseUrl)
      .pipe(
        catchError(this.handleError('getExercises', []))
      );
  }
  /** GET hero by id. Will 404 if id not found */
  getExercise(id: number): Observable<Exercise> {
    const url = `${this.exerciseUrl}/${id}`;
    return this.http.get<Exercise>(url).pipe(
      catchError(this.handleError<Exercise>(`getExercise id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateExercise (exercise: Exercise): Observable<any> {
    return this.http.put(this.exerciseUrl, Exercise, httpOptions).pipe(
      tap(_ => this.log(`updated exercise id=${exercise.id}`)),
      catchError(this.handleError<any>('updateExercise'))
    );
  }

  /** POST: add a new hero to the server */
  addExercise (exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.exerciseUrl, Exercise, httpOptions).pipe(
      tap(_ => this.log(`created exercise id=${exercise.id}`)),
      catchError(this.handleError<Exercise>('addExercise'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteExercise (exercise: Exercise | number): Observable<Exercise> {
    const id = typeof exercise === 'number' ? exercise : exercise.id;
    const url = `${this.exerciseUrl}/${id}`;

    return this.http.delete<Exercise>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted exercise id=${id}`)),
      catchError(this.handleError<Exercise>('deleteExercise'))
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
    this.messageSnackbarService.show(`ExerciseService: ${message}`);
  }
}
