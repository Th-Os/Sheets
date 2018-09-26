import {Solution} from './solution';

export class Task {
  _id: string;
  question: string;
  points = 0;
  order: number;
  choices: string[];
  solution: Solution;
}
