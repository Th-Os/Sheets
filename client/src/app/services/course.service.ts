import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageSnackbarService } from '../message-snackbar.service';
import { Course } from "../models/course";
import {Sheet} from '../models/sheet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private coursesUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient,
              private messageSnackbarService: MessageSnackbarService) { }

  getCourses (): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        catchError(this.handleError('getCourses', []))
      );
  }

  /** GET course by id. Will 404 if id not found */
  getCourse(id: string): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  getCourseSheets(id: string): Observable<Sheet[]> {
    const url = `${this.coursesUrl}/${id}/sheets`;
    return this.http.get<Sheet[]>(url)
      .pipe(
        catchError(this.handleError(`getCourseSheets id=${id}`, []))
      );
  }

  /** PUT: update the course on the server */
  updateCourse (course: Course): Observable<any> {
    return this.http.put(this.coursesUrl + '/' + course._id, course, httpOptions).pipe(
      tap(_ => this.log(`Kurs erfolgreich geändert.`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  /** POST: add a new course to the server */
  addCourse (course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, httpOptions).pipe(
      tap((course: Course) => this.log(`Kurs ${course.name} erfolgreich erstellt.`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  /** DELETE: delete the course from the server */
  deleteCourse (course: Course | number): Observable<Course> {
    const id = typeof course === 'number' ? course : course._id;
    const url = `${this.coursesUrl}/${id}`;

    return this.http.delete<Course>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
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

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CourseService message with the MessageService */
  private log(message: string) {
    this.messageSnackbarService.show(`CourseService: ${message}`);
  }
}
