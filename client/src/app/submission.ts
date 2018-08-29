import {Answer} from "./answer";

export class Submission {
	id: number;
	user_id: number;
	student_id: number;
	answers: Answer[];
	//ui
	author_name:string;
}
