import {SolutionRange} from './solutionRange';

export class Solution {
  _id: number;
  type: string;
  regex: string;
  range: SolutionRange;
  number: number;
  hint: string;
  default_free_text: boolean;
}
