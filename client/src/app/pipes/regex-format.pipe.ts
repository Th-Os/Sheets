import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regexFormatPipe'
})
export class RegexFormatPipe implements PipeTransform {

  // Adds comma after each regex in regex-string for better display
  transform(regexString: string): string {
    const newArray = [];
    const splitArray = regexString.split('/b');
    splitArray.forEach(regex => {
      if (regex !== splitArray[splitArray.length - 1]) {
        regex += '/b';
        newArray.push(regex);
      }
    });
    return newArray.join();
  }

}
