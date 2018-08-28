import { Component, OnInit } from '@angular/core';
import {CourseService} from "../course.service";
import {Course} from "../course";
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

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  create(): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: 'auto',
      data: {create: true, course: null}
    });

    dialogRef.afterClosed().subscribe((course) => {
      if(course) {
        this.courseService.addCourse(course)
          .subscribe(course => {
            console.log(course);
            this.courses.push(course);
          });
      }
    });
  }

  update(course: Course): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      data: {create: false, course: course}
    });

    dialogRef.afterClosed().subscribe(updatedCourse => {
      this.courseService.updateCourse(updatedCourse)
        .subscribe(() => {
          let index = this.courses.indexOf(this.courses.find((c) => c.id === course.id, course));
          this.courses[index] = updatedCourse;
        });
    });
  }

  delete(course: Course): void {
    this.courses = this.courses.filter(c => c !== course);
    this.courseService.deleteCourse(course)
  }
}
