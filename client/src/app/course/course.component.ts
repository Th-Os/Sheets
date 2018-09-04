import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CourseService }  from '../course.service';
import {Course} from "../course";
import {Sheet} from "../sheet";
import {SheetService} from "../sheet.service";
import {ExerciseDialogComponent} from '../exercise-dialog/exercise-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sheetService: SheetService,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCourse();
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
      .subscribe(course => this.course = course );
  }

  delete(sheet: Sheet): void {
    this.course.sheets = this.course.sheets.filter(s => s !== sheet);
    this.sheetService.deleteSheet(sheet);
  }

  add(): void {
    this.dialog.open(ExerciseDialogComponent, {
      width: 'auto'
    });
  }

  goBack(): void {
    this.location.back();
  }

}
