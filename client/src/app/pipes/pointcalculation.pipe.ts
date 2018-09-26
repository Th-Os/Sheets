import { Pipe, PipeTransform } from '@angular/core';

import {Task} from '../models/task';

@Pipe({
  name: 'pointcalculationPipe'
})
export class PointcalculationPipe implements PipeTransform {

 constructor () {}

  transform(tasks: Task[]): number {
    let points = 0;
    tasks.forEach(task => {
      points += task.points;
    });
    return points;
  }

}
