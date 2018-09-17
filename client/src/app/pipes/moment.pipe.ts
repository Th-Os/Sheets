import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentPipe'
})
export class MomentPipe implements PipeTransform {

  transform(value: Date|moment.Moment, format: string): string {
    moment.locale('de');
    return moment(value).format(format);
  }

}
