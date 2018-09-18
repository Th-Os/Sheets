import { Task } from './task';

export class Exercise {
  _id: string;
  name: string;
  description: string;
  tasks: Task[];
  order: number;
  persistent: boolean;
}
