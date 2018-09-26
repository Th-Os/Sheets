import {Answer} from "./answer";
import {Student} from "./student";
import {User} from './user';

export class Submission {
	_id: string;
	user: User;
  //user: string;
	student: Student;
	answers: Answer[];
	grips_id: number;
	//ui
	author_name:string;
	author_lastname: string;
}
