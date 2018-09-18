import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Form, FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SheetsMaterialComponentsModule } from './sheets-material-components.module';
import { HttpClientModule } from '@angular/common/http';
import {SheetsOtherComponentsModule} from './sheets-other-components.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CourseComponent } from './course/course.component';
import { SheetComponent } from './sheet/sheet.component';
import { FileDropDirective } from './file-drop.directive';
import { SubmissionUploadErrorDialogComponent } from './submission-upload-error-dialog/submission-upload-error-dialog.component';
import { CorrectionComponent } from './correction/correction.component';
import { CorrectionInterfaceComponent } from './correction-interface/correction-interface.component';
import { ExerciseDialogComponent } from './exercise-dialog/exercise-dialog.component';
import { CreateSheetComponent } from './create-sheet/create-sheet.component';
import { MomentPipe } from './pipes/moment.pipe';
import { PointcalculationPipe } from './pipes/pointcalculation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDialogComponent,
    CourseComponent,
    SheetComponent,
    FileDropDirective,
    SubmissionUploadErrorDialogComponent,
    CorrectionComponent,
    CorrectionInterfaceComponent,
    ExerciseDialogComponent,
    CreateSheetComponent,
    MomentPipe,
    PointcalculationPipe,
  ],
  entryComponents: [
    SubmissionUploadErrorDialogComponent,
    CourseDialogComponent,
    ExerciseDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    SheetsMaterialComponentsModule,
    SheetsOtherComponentsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
