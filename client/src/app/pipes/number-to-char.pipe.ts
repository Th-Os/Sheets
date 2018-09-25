import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToChar'
})
export class NumberToCharPipe implements PipeTransform {

  private alphabet: string[]  = 'abcdefghijklmnopqrstuvwxyz'.split('');

  transform(value: number): string {
    return this.alphabet[value];
  }

}
