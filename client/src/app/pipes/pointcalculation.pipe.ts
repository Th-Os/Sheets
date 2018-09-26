import { Pipe, PipeTransform } from '@angular/core';

import {Task} from '../models/task';

@Pipe({
  name: 'pointcalculationPipe'
})
export class PointcalculationPipe implements PipeTransform {

 constructor () {}

 // Calculate points for exercise by sum of points for each task
  transform(tasks: Task[]): number {
    let points = 0;
    tasks.forEach(task => {
      points += task.points;
    });
    return points;
  }

}
