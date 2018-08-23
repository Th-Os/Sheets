import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CoursesComponent} from "./courses/courses.component";
import {CourseComponent} from "./course/course.component";

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'courses/:id', component: CourseComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
