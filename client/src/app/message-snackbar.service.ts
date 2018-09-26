import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class MessageSnackbarService {

  messages: string[] = [];
  message: string = null;

  constructor(public snackBar: MatSnackBar) {}

  show(message: string) : void {
    this.message = message;
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }
}
