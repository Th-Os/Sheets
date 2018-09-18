import {Answer} from './classes/answer';

export class SubmissionValidationResult {
	filename: string;
	answers: Answer[];
	errorLineNum: number;
	constructor() {}
}
