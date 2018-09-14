import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CourseService }  from '../course.service';
import {Course} from "../models/course";
import {Sheet} from "../models/sheet";
import {SheetService} from "../sheet.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;
  sheets: Sheet[];
  loadingSheets: boolean = false

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private sheetService: SheetService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCourse();
    this.getCourseSheets();
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
      .subscribe(course => this.course = course );
  }

  getCourseSheets(): void {
    this.loadingSheets = true;
    /*
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourseSheets(id)
      .subscribe(sheets => {
        this.sheets = sheets;
        this.loadingSheets = false;
      });
      */
  }

  deleteSheet(sheet: Sheet): void {
    this.course.sheets = this.course.sheets.filter(s => s !== sheet);
    this.sheetService.deleteSheet(sheet);
  }

  goBack(): void {
    this.location.back();
  }

}
