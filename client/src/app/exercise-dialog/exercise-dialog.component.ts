import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {Course} from '../course';
import {Sheet} from '../sheet';
import {Exercise} from '../exercise';
import { CourseService } from '../course.service';
import {SheetService} from '../sheet.service';

@Component({
  selector: 'app-exercise-dialog',
  templateUrl: './exercise-dialog.component.html',
  styleUrls: ['./exercise-dialog.component.css']
})
export class ExerciseDialogComponent implements OnInit {

  course: Course;
  sheet: Sheet;
  exercise: Exercise;
  useTemplate: boolean;
  selectedSheetId: number;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    private router: Router,
    private courseService: CourseService,
    private sheetService: SheetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCourse();
  }

  getCourse(): void {
    // Todo: Fix to get actual id
    const id = +this.route.snapshot.paramMap.get('id') + 1;
    this.courseService.getCourse(id)
      .subscribe(course => this.course = course );
  }

  create(): void {
    // Todo: Test with API
    this.sheet = new Sheet();

    /*if (this.useTemplate) {
      this.sheetService.getSheet(this.selectedSheetId)
        .subscribe(sheet => {
          console.log(sheet);
          this.sheet = sheet;
          this.sheet.name = 'Aufgabenblatt aus Vorlage: ' + sheet.name;
        });
    } else {
      this.sheet.name = 'Neues Aufgabenblatt';
    }

    if (this.sheet.id) {
      this.sheetService.addSheet(this.sheet)
        .subscribe(sheet => {
          console.log(sheet);
          this.router.navigateByUrl('/sheet/' + sheet.id + '/create');
        });
    }*/

    this.router.navigateByUrl('/sheet/create');
    this.dialogRef.close();
  }

  onClose(create: boolean): void {
    if (create) {
      this.create();
    } else { this.dialogRef.close(); }
  }
}
