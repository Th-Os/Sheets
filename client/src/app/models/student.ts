import {Submission} from './submission';

export class Student {
	_id: number;
	name: string;
	lastname: string;
	mat_nr: number;
	grips_id: number;
	status: string;
	statusIcon: string; //ui
	statusString: string; //ui
	submissions: Submission[]; //ui

}
