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

@NgModule({
  imports: [
    MatToolbarModule, MatCardModule,
    MatListModule, MatDividerModule,
    MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule, MatCardModule,
    MatListModule, MatDividerModule,
    MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule,
    MatProgressSpinnerModule
  ],
})
export class SheetsMaterialComponentsModule { }
