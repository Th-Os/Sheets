import {Course} from "./course";

export class Sheet {
  id: number;
  name: string;
  course_id: number;
  submissions: string[];
  submissiondate: string;
  exercises: string[];
  min_reg_points: number;
}
