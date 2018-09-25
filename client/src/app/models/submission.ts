import {Answer} from "./answer";
import {Student} from "./student";

export class Submission {
	_id: string;
	user_id: number;
	student: Student;
	answers: Answer[];
	//ui
	author_name:string;
	author_lastname: string;
}
