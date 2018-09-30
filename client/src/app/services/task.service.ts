import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageSnackbarService } from '../message-snackbar.service';
import { Observable, of } from 'rxjs';
import {Task} from '../models/task';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'http://localhost:3000/tasks';
  private exercisesUrl = 'http://localhost:3000/exercises';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService
  ) { }

  // Get all tasks of an exercise
  getTasks (exerciseId: string): Observable<Task[]> {
    const url = `${this.exercisesUrl}/${exerciseId}/tasks`;
    return this.http.get<Task[]>(url)
      .pipe(
        catchError(this.handleError('getTasks', []))
      );
  }

  // Get single task by id
  getTask(id: any): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /*updateTask (task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, Task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task._id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }*/

  // Update task in db
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task._id}`, task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task._id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /*
  updateTask (task: Task): Task {
    let updatedTask = new Task();
    this.http.put<Task>(this.tasksUrl + '/' + task._id, task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task._id}`)),
      catchError(this.handleError<any>('updateTask')))
      .subscribe(res => updatedTask = res);
    return updatedTask;
  }
  */

  // Add task to exercise
  addTasks(exerciseId: string, tasks: Task[]): Observable<Task[]> {
    const url = `${this.exercisesUrl}/${exerciseId}/tasks`;
    return this.http.post<Task[]>(url, tasks, httpOptions).pipe(
      tap((newTask: Task[]) => this.log(`created tasks id=${newTask[0]._id}`)),
      catchError(this.handleError<Task[]>('addTask'))
    );
  }

  // Delete task in db
  deleteTask (task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task._id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
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
    this.messageSnackbarService.show(`TaskService: ${message}`);
  }
}
