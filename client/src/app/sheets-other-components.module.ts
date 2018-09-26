import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

@NgModule({
  imports: [
    //CommonModule
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'de'}
  ],
})
export class SheetsOtherComponentsModule { }
