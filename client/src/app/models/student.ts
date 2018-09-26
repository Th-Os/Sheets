export class Student {
	_id: number;
	name: string;
	lastname: string;
	mat_nr: number;
	grips_id: number;
	status: number;
	statusIcon: string; //ui
	statusString: string; //ui

	constructor() {
		this.status = 0;
		this.statusIcon = "delete"
	}
}
