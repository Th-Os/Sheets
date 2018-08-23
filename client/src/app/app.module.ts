import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Form, FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SheetsMaterialComponentsModule } from './sheets-material-components.module';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { FileDropDirective } from './file-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDialogComponent,
    ExerciseComponent,
    FileDropDirective
  ],
  entryComponents: [
    CourseDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    SheetsMaterialComponentsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
