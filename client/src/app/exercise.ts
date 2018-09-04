import {Task} from './task';

export class Exercise {
  id: number;
  name: string;
  description: string;
  task: Task[];
  order: number;
}

// Todo: Probably remove order-field (not necessary because only one exeercise per sheet)
