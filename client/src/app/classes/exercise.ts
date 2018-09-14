import {Task} from './task';

export class Exercise {
  _id: number;
  name: string;
  description: string;
  tasks: Task[];
  order: number;
  persistent: boolean;
}
