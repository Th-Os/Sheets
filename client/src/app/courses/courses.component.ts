import { Component, OnInit } from '@angular/core';
import {CourseService} from "../services/course.service";
import {Course} from "../models/course";
import {MatDialog} from "@angular/material";
import {CourseDialogComponent} from "../course-dialog/course-dialog.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getCourses();
  }

  /**
   * Holt die Kurse vom Server
   */
  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  /**
   * Öffnet den Dialog zum Bearbeiten eines Kurses
   * @param create Gibt an ob der Kurs bearbeiten oder erstellt wird
   * @param course Kursobjekt
   */
  showEditDialog(create:boolean, course: Course): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '50%',
      data: { create: create, course: course }
    });

    dialogRef.afterClosed().subscribe((result: Course) => {
      if (!result) return;
      if (create) {
        this.courses.push(result)
      } else {
        let index = this.courses.findIndex(c => c._id === course._id);
        this.courses[index] = result;
      }
    });
  }

  /**
   * Ruft den Dialog zum Bearbeiten eines Kurses auf
   * @param course
   */
  update(course: Course): void {
    this.showEditDialog(false, course);
  }

  /**
   * Ruf den Dialog zum Erstellen eines Kurses auf
   */
  add(): void {
    this.showEditDialog(true, new Course('', '','',0));
  }

  /**
   * Löscht einen Kurs
   * @param course
   */
  delete(course: Course): void {
    if (window.confirm('Wollen Sie den Kurs wirklich löschen?')) {
      this.courses = this.courses.filter(c => c !== course);
      this.courseService.deleteCourse(course).subscribe();
    }
  }
}
