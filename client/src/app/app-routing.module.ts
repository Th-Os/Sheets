import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CoursesComponent} from "./courses/courses.component";
import {CourseComponent} from "./course/course.component";
import {SheetComponent} from "./sheet/sheet.component";
import {CorrectionComponent} from "./correction/correction.component";

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'courses/:id', component: CourseComponent },
  { path: 'sheets/:id', component: SheetComponent },
  { path: 'sheets/:id/correction', component: CorrectionComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
