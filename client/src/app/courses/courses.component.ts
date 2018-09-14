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

  showEditDialog(create:boolean, course: Course): void {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
      width: 'auto',
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

  update(course: Course): void {
    this.showEditDialog(false, course);
  }

  add(): void {
    this.showEditDialog(true, new Course(null, '','','',0));
  }

  delete(course: Course): void {
    this.courses = this.courses.filter(c => c !== course);
    this.courseService.deleteCourse(course).subscribe();
  }
}
