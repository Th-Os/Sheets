import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { CourseDialogData} from "./course-dialog-data";
import {Course} from "../course";

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  course: Course;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseDialogData) {}

  ngOnInit() {
    this.course = new Course();
    if (!this.data.create) {
      this.course.name = this.data.course.name;
      this.course.faculty = this.data.course.faculty;
      this.course.semester = this.data.course.semester;
      this.course.min_req_sheets = this.data.course.min_req_sheets;
      this.course.id = this.data.course.id;
      this.course.sheets = this.data.course.sheets;
    }
  }

  onClose(withResult: boolean): void {
    if (withResult) this.dialogRef.close(this.course);
    else this.dialogRef.close();
  }

}
