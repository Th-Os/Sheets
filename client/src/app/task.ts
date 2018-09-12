
import {Solution} from './solution';

export class Task {
  id: number;
  question: string;
  points = 0;
  order: number;
  choices: string;
  solution: Solution;
}
