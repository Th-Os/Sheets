import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Course } from "../models/course";
import { CourseService } from "../course.service";

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  course: Course;
  saving: boolean = false;

  constructor(
    private courseService: CourseService,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {create: boolean,course: Course}) { }

  ngOnInit() {
    this.course = this.data.course;
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.saving = true;
    if (this.data.create) {
      this.courseService.addCourse(this.course)
        .subscribe(course => {
          this.dialogRef.close(course);
          this.saving = false;
        });
    } else {
      this.courseService.updateCourse(this.course)
        .subscribe(course => {
          this.dialogRef.close(course);
          this.saving = false
        });
    }
  }

}
