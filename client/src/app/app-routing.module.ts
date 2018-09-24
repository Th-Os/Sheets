import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CoursesComponent} from "./courses/courses.component";
import {CourseComponent} from "./course/course.component";
import {SheetComponent} from "./sheet/sheet.component";
import {CreateSheetComponent} from './create-sheet/create-sheet.component';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {UserprofileComponent} from './userprofile/userprofile.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseComponent },
  { path: 'sheets/:id', component: SheetComponent },
  { path: 'sheet/:id/create', component: CreateSheetComponent },
  { path: 'sheet/:id/edit', component: CreateSheetComponent},
  { path: 'profile', component: UserprofileComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
