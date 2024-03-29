import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageSnackbarService } from '../message-snackbar.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Solution} from '../models/solution';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private tasksUrl = 'http://localhost:3000/tasks';
  private solutionsUrl = 'http://localhost:3000/solutions';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService
  ) { }

  // Get all solutions of a task
  getSolution(taskId: string): Observable<Solution[]> {
    const url = `${this.tasksUrl}/${taskId}/solutions`;
    return this.http.get<Solution[]>(url).pipe(
      catchError(this.handleError<Solution[]>(`getSolution of Task with id=${taskId}`))
    );
  }

  /*updateSolution(solution: Solution): Observable<any> {
    return this.http.put(this.solutionsUrl, Solution, httpOptions).pipe(
      tap(_ => this.log(`updated solution id=${solution._id}`)),
      catchError(this.handleError<any>('updateSolution'))
    );
  }*/

  // Update solution in db
  updateSolution (solution: Solution): Observable<Solution> {
    return this.http.put<Solution>(this.solutionsUrl + '/' + solution._id, solution, httpOptions).pipe(
      tap(_ => this.log(`updated solution id=${solution._id}`)),
      catchError(this.handleError<any>('updateSolution'))
    );
  }

  // Add solution to task
  addSolution(taskId: string, solution: Solution): Observable<Solution> {
    const url = `${this.tasksUrl}/${taskId}/solutions`;
    return this.http.post<Solution>(url, solution, httpOptions).pipe(
      tap((newSolution: Solution) => this.log(`created solution id=${newSolution[0]._id}`)),
      catchError(this.handleError<Solution>('addSolution'))
    );
  }

  // Delete solution in db
  deleteSolution(solution: Solution | string): Observable<Solution> {
    const id = typeof solution === 'string' ? solution : solution._id;
    const url = `${this.solutionsUrl}/${id}`;

    return this.http.delete<Solution>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted solution id=${id}`)),
      catchError(this.handleError<Solution>('deleteSolution'))
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

  private log(message: string) {
    this.messageSnackbarService.show(`SolutionService: ${message}`);
  }
}
