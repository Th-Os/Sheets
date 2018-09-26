import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
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
import { CorrectionInterfaceComponent } from './correction/correction-interface/correction-interface.component';
import { ExerciseDialogComponent } from './exercise-dialog/exercise-dialog.component';
import { CreateSheetComponent } from './create-sheet/create-sheet.component';
import { MomentPipe } from './pipes/moment.pipe';
import { PointcalculationPipe } from './pipes/pointcalculation.pipe';
import { RegexFormatPipe } from './pipes/regex-format.pipe';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { FilterusersPipe } from './pipes/filterusers.pipe';
import { NumberToCharPipe } from './pipes/number-to-char.pipe';
import { CreateSheetInterfaceComponent } from './create-sheet/create-sheet-interface/create-sheet-interface.component';
import { AssignSubmissionDialogComponent } from './assign-submission-dialog/assign-submission-dialog.component';
import { CheckCoursesPipe } from './pipes/check-courses.pipe';
import { CheckSubmissionsPipe } from './pipes/check-submissions.pipe';

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
    RegexFormatPipe,
    LoginComponent,
    UserprofileComponent,
    UserDialogComponent,
    FilterusersPipe,
    NumberToCharPipe,
    AssignSubmissionDialogComponent,
    CreateSheetInterfaceComponent,
    CheckCoursesPipe,
    CheckSubmissionsPipe,
  ],
  entryComponents: [
    SubmissionUploadErrorDialogComponent,
    CourseDialogComponent,
    ExerciseDialogComponent,
    UserDialogComponent,
    AssignSubmissionDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SheetsMaterialComponentsModule,
    SheetsOtherComponentsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MomentPipe,
    PointcalculationPipe,
    RegexFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
