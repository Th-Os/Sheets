import {Task} from './task';


export class Answer {
	id: number;
	text: string;
	task: Task;
	task_id: number;
	feedback: string;
	auto_corrected: boolean;
	corrected: boolean;
	help: boolean;
	achieved_points: number;
}
