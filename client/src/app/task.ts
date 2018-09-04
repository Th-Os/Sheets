export class Task {
  id: number;
  questiontitle: string;
  questiontext: string;
  points: number;
  order: number;
  choices: string;
  solution: string;
  type: string;
}
// Todo: Probably add field for type of question (e.g. freetext, multiple choice etc.)
