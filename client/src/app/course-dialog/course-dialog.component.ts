import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Course } from "../course";
import { CourseService } from "../course.service";

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  semesters = ['Wintersemester', 'Sommersemester',];
  course: Course;
  loading: boolean = false;

  constructor(
    private courseService: CourseService,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {create: boolean,course: Course}) { }

  ngOnInit() {
    this.course = this.data.course;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.create) {
      this.courseService.addCourse(this.course)
        .subscribe(course => {
          console.log(course);
          this.dialogRef.close(course);
        } );
    } else {
      this.courseService.updateCourse(this.course)
        .subscribe(course => this.dialogRef.close(course) );
    }
  }

}
