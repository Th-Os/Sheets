import {Course} from "./course";
import {Submission} from "./submission";
import {Exercise} from './exercise';


export class Sheet {
  id: number;
  name: string;
  course_id: number;
  submissions: Submission[];
  submissiondate: string;
  exercises: Exercise[];
  min_reg_points: number;
}
