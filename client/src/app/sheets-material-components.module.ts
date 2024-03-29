import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import 'hammerjs';

@NgModule({
  imports: [
    MatToolbarModule, MatCardModule,
    MatListModule, MatDividerModule,
    MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule,
    MatSelectModule, MatFormFieldModule,
    MatRadioModule, MatGridListModule,
    MatSnackBarModule, MatProgressSpinnerModule,
    MatDatepickerModule, MatNativeDateModule,
    MatTreeModule, MatProgressBarModule,
    MatButtonToggleModule, MatCheckboxModule,
    MatSlideToggleModule, MatTooltipModule,
    MatTabsModule, MatSliderModule,
  ],
  exports: [
    MatToolbarModule, MatCardModule,
    MatListModule, MatDividerModule,
    MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatSnackBarModule,
    MatSelectModule, MatFormFieldModule,
    MatRadioModule, MatGridListModule,
    MatDatepickerModule, MatNativeDateModule,
    MatTreeModule, MatProgressBarModule,
    MatButtonToggleModule, MatCheckboxModule,
    MatSlideToggleModule, MatTooltipModule,
    MatTabsModule, MatSliderModule,
  ],
})
export class SheetsMaterialComponentsModule { }
