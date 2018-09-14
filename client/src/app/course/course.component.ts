import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { CourseService } from '../services/course.service';
import {Course} from '../classes/course';
import {Sheet} from '../classes/sheet';
import {SheetService} from '../services/sheet.service';
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
    private router: Router,
    private courseService: CourseService,
    private sheetService: SheetService,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCourse();
    this.getSheets();
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
      .subscribe(course => this.course = course);
  }

  getSheets(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheets(id)
      .subscribe(sheets => this.course.sheets = sheets);
  }

  // Todo: Fix: Switches to sheets site (routing problem?) when deleting sheet
  delete(sheet: Sheet): void {
     //this.course.sheets = this.course.sheets.filter(s => s !== sheet);

    const sheetIndex = this.course.sheets.indexOf(sheet);
    this.sheetService.deleteSheet(sheet).subscribe(_ => {
      this.course.sheets.splice(sheetIndex, 1);
      this.courseService.updateCourse(this.course);
    });
  }

  update(sheet: Sheet): void {
    this.router.navigateByUrl('/sheet/' + sheet._id + '/edit');
  }

  add(): void {
    this.dialog.open(ExerciseDialogComponent, {
      width: 'auto',
      data: {courseId: this.route.snapshot.paramMap.get('id')}
    });
  }

  goBack(): void {
    this.location.back();
  }

}
