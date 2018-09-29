import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageSnackbarService } from '../message-snackbar.service';
import { Observable, of } from 'rxjs';
import {Exercise} from '../models/exercise';
import { catchError, tap } from 'rxjs/operators';

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
              private messageSnackbarService: MessageSnackbarService
  ) { }

  // Get all exercises of a sheet
  getExercises (sheetId: string): Observable<Exercise[]> {
    const url = `${this.sheetsUrl}/${sheetId}/exercises`;
    return this.http.get<Exercise[]>(url)
      .pipe(
        catchError(this.handleError('getExercises', []))
      );
  }

  // Get single exercise by id
  getExercise(id: string): Observable<Exercise> {
    const url = `${this.exercisesUrl}/${id}`;
    return this.http.get<Exercise>(url).pipe(
      catchError(this.handleError<Exercise>(`getExercise id=${id}`))
    );
  }

  // Update exercise in db
  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.exercisesUrl}/${exercise._id}`, exercise, httpOptions).pipe(
      tap(_ => this.log(`Aufgabe erfolreich geändert.`)),
      catchError(this.handleError<any>('updateExercise')));
  }


  // Add exercise to sheet
  addExercise (sheetsId: string, exercise: Exercise): Observable<Exercise> {
    const url = `${this.sheetsUrl}/${sheetsId}/exercises`;
    return this.http.post<Exercise>(url, exercise, httpOptions).pipe(
      tap((newExercise: Exercise) => this.log(`Aufgabe erstellt.`)),
      catchError(this.handleError<Exercise>('addExercise'))
    );
  }

  // Delete exercise in db
  deleteExercise (exercise: Exercise | number): Observable<Exercise> {
    const id = typeof exercise === 'number' ? exercise : exercise._id;
    const url = `${this.exercisesUrl}/${id}`;

    return this.http.delete<Exercise>(url, httpOptions).pipe(
      tap(_ => this.log(`Aufgabe gelöscht.`)),
      catchError(this.handleError<Exercise>('deleteExercise'))
    );
  }

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
