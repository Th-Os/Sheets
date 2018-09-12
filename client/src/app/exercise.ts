import {Task} from './task';

export class Exercise {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
  order: number;
  persistentFlag: boolean;
}
