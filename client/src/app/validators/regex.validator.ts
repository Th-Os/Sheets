import { AbstractControl } from '@angular/forms';

export function ValidateRegex(control: AbstractControl) {
  try {
    let regExp = new RegExp(control.value);
    return null;
  } catch (e) {
    return {regex: true};
  }
}
