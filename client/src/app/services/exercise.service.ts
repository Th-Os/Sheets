import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageSnackbarService } from '../message-snackbar.service';
import { Observable, of } from 'rxjs';
import {Exercise} from '../models/exercise';
import { catchError, tap } from 'rxjs/operators';
import {Sheet} from '../models/sheet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private sheetsUrl = 'http://localhost:3000/sheets';
  private exercisesUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService) { }

  getExercises (sheetId: string): Observable<Exercise[]> {
    const url = `${this.sheetsUrl}/${sheetId}/exercises`;
    return this.http.get<Exercise[]>(url)
      .pipe(
        catchError(this.handleError('getExercises', []))
      );
  }
  /** GET exercise by id. Will 404 if id not found */
  getExercise(id: string): Observable<Exercise> {
    const url = `${this.exercisesUrl}/${id}`;
    return this.http.get<Exercise>(url).pipe(
      catchError(this.handleError<Exercise>(`getExercise id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  /*updateExercise (exercise: Exercise): Observable<any> {
    return this.http.put(this.exercisesUrl, Exercise, httpOptions).pipe(
      tap(_ => this.log(`updated exercise id=${exercise._id}`)),
      catchError(this.handleError<any>('updateExercise'))
    );
  }*/

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.exercisesUrl}/${exercise._id}`, exercise, httpOptions).pipe(
      tap(_ => this.log(`updated exercise id=${exercise._id}`)),
      catchError(this.handleError<any>('updateExercise')))
  }

  /*
  updateExercise (exercise: Exercise): Exercise {
    let updatedExercise = new Exercise();
    this.http.put<Exercise>(this.exercisesUrl + '/' + exercise._id, exercise, httpOptions).pipe(
      tap(_ => this.log(`updated exercise id=${exercise._id}`)),
      catchError(this.handleError<any>('updateExercise')))
      .subscribe(res => updatedExercise = res);
    return updatedExercise;
  }
  */
  /** POST: add a new exercise to sheet on the server */
  addExercise (sheetsId: string, exercise: Exercise): Observable<Exercise> {
    const url = `${this.sheetsUrl}/${sheetsId}/exercises`;
    return this.http.post<Exercise>(url, exercise, httpOptions).pipe(
      tap((newExercise: Exercise) => this.log(`created exercise id=${newExercise[0]._id}`)),
      catchError(this.handleError<Exercise>('addExercise'))
    );
  }

  /** DELETE: delete the eercise from the server */
  deleteExercise (exercise: Exercise | number): Observable<Exercise> {
    const id = typeof exercise === 'number' ? exercise : exercise._id;
    const url = `${this.exercisesUrl}/${id}`;

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
