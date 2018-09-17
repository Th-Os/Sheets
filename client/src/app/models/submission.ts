import {Answer} from "../answer";

export class Submission {
	_id: string;
	user_id: number;
	student: number;
	answers: Answer[];
	//ui
	author_name:string;
	author_lastname: string;
}
