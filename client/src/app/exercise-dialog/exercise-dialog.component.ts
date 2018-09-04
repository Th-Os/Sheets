import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {Course} from '../course';
import {Sheet} from '../sheet';
import {Exercise} from '../exercise';
import { CourseService } from '../course.service';
import {ExerciseService} from '../exercise.service';
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
  exerciseId: number;
  selectedSheetId: number;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    private router: Router,
    private courseService: CourseService,
    private exerciseService: ExerciseService,
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
    /*this.sheet = new Sheet();
    this.exercise = new Exercise();

    if (this.useTemplate) {
      this.sheetService.getSheet(this.selectedSheetId)
        .subscribe(sheet => {
          console.log(sheet);
          this.sheet = sheet;
          this.sheet.name = 'Aufgabenblatt aus Vorlage: ' + sheet.name;
        });
      this.exercise = this.sheet.exercises;
    } else {
      this.sheet.name = 'Neues Aufgabenblatt';
    }

    this.exerciseService.addExercise(this.exercise)
      .subscribe(exercise => {
        console.log(exercise);
        this.sheet.exercises = exercise;
      });

    this.sheetService.addSheet(this.sheet)
      .subscribe(sheet => {
        console.log(sheet);
        this.exerciseId = sheet.exercises.id;
      });*/

    //this.router.navigateByUrl('/exercise/' + this.exerciseId);
    this.router.navigateByUrl('/exercise');
    this.dialogRef.close();
  }

  onClose(create: boolean): void {
    if (create) {
      this.create();
    } else { this.dialogRef.close(); }
  }
}
