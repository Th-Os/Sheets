import {Answer} from './models/answer';

export class SubmissionValidationResult {

	filename: string;
	answers: Answer[];
	errorTaskNum: number;
	constructor(){

	}

	errorString(): string {
		let res = this.errorTaskNum.toString();
		let subTaskIndicator = "";

		if(res.length >= 3){
			let lastnum = res.toString().split('').pop();
			let last = parseInt(lastnum)
			subTaskIndicator = String.fromCharCode(last + 97);
		}
		res = res.substring(0, res.length - 1);


		return "[Aufgabe: " + this.chunk(res, 1).join('.') + subTaskIndicator + "]";
	}

	chunk(str, n) {
 	//Taken from:
 	//https://stackoverflow.com/questions/1772941/how-can-i-insert-a-character-after-every-n-characters-in-javascript
 	var ret = [];
 	var i;
 	var len;

 	for(i = 0, len = str.length; i < len; i += n) {
 		ret.push(str.substr(i, n))
 	}

 	return ret
 };

}
