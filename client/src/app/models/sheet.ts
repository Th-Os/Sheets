import {Course} from "./course";
import {Submission} from "../submission";


export class Sheet {
  id: number;
  name: string;
  course_id: number;
  submissions: Submission[];
  submissiondate: string;
  exercises: string[];
  min_req_points: number;
  perstistent: boolean;
}
