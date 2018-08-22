import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CoursesComponent} from "./courses/courses.component";
import {ExerciseComponent} from "./exercise/exercise.component";

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'exercise/:id', component: ExerciseComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
