import {Solution} from './solution';

export class Task {
  _id: number;
  question: string;
  points = 0;
  order: number;
  choices: string;
  solution: Solution;
}
