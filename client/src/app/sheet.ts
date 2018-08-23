import {Course} from "./course";

export class Sheet {
  id: number;
  name: string;
  course: Course;
  submissions: string[];
  submissiondate: string;
  exercises: string[];
  min_reg_points: number;
}
