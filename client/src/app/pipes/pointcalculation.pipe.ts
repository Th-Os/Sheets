import { Pipe, PipeTransform } from '@angular/core';

import {Exercise} from '../models/exercise';
import {TaskService} from '../services/task.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Pipe({
  name: 'pointcalculationPipe'
})
export class PointcalculationPipe implements PipeTransform {

  public calcPoints = 0;

 constructor (private taskService: TaskService) {}

  transform(exerciseId: string): number {
    let points = 0;
     /*this.taskService.getTasks(exerciseId).subscribe(tasks => {
      if (tasks) {
        console.log('Berechnung: ' + exerciseId);
        tasks.forEach(task => {
          points += task.points;
          console.log('Berechnete Punkte: ' + points);
        });
      }
    });*/
    return points;
  }

}
