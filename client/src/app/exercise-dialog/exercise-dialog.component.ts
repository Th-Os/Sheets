import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {Router} from '@angular/router';

import {Course} from '../models/course';
import {Sheet} from '../models/sheet';
import { CourseService } from '../services/course.service';
import {SheetService} from '../services/sheet.service';

@Component({
  selector: 'app-exercise-dialog',
  templateUrl: './exercise-dialog.component.html',
  styleUrls: ['./exercise-dialog.component.css']
})
export class ExerciseDialogComponent implements OnInit {

  course: Course;
  sheets = [];
  useTemplate: boolean;
  selectedSheetId: number;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {courseId: string},
    private router: Router,
    private courseService: CourseService,
    private sheetService: SheetService
  ) { }

  ngOnInit() {
    this.getSheets(this.data.courseId);
  }

  getSheets(id: string): void {
    this.sheetService.getSheets(id)
      .subscribe(sheets => this.sheets = sheets );
  }

  create(): void {
    const newSheet = new Sheet();

    if (this.useTemplate) {
      this.sheetService.getSheet(this.selectedSheetId.toString())
        .subscribe(sheet => {
          newSheet.exercises = sheet.exercises;
          newSheet.submissiondate = '2018-05-18 10:00:00.000';
          newSheet.name = 'Aufgabenblatt aus Vorlage: ' + sheet.name;
          newSheet.min_req_points = 0;
          newSheet.persistent = false;

          this.sheetService.getSheets(this.data.courseId).subscribe(sheets => {
            newSheet.order = sheets.length;
            this.addSheet(newSheet);
          });
        });
    } else {
      newSheet.name = 'Neues Aufgabenblatt';
      newSheet.submissiondate = '2018-05-18 10:00:00.000';
      newSheet.min_req_points = 0;
      newSheet.persistent = false;
      this.sheetService.getSheets(this.data.courseId).subscribe(sheets => newSheet.order = sheets.length);

      this.addSheet(newSheet);
    }
  }

  addSheet(newSheet: Sheet): void {
    this.sheetService.addSheet(this.data.courseId, newSheet)
      .subscribe(sheet => this.router.navigateByUrl('/sheet/' + sheet[0]._id + '/create'));

    this.dialogRef.close();
  }

  onClose(create: boolean): void {
    if (create) {
      this.create();
    } else { this.dialogRef.close(); }
  }
}
