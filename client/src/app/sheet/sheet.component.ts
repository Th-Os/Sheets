import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../course.service";
import {SheetService} from "../sheet.service";
import {Location} from "@angular/common";
import {Sheet} from "../sheet";

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {

  sheet: Sheet;

  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSheet();
  }

  getSheet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheet(id);
  }

  goBack(): void {
    this.location.back();
  }

}
