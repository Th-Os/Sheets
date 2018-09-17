import {Answer} from './models/answer';

export class SubmissionValidationResult {
	filename: string
	answers: Answer[]
	errorLineNum: number
	constructor(){
		
	}
}
