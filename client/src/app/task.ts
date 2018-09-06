import {Solution} from './solution';

export class Task {
  id: number;
  question: string;
  points: number;
  order: number;
  choices: string;
  solution: Solution;
}
