import {Submission} from './submission';
import {Exercise} from './exercise';


export class Sheet {
  public _id: string;
  public name: string;
  public order: number;
  public submissions: Submission[];
  public submissiondate: string;
  public exercises: Exercise[];
  public min_req_points: number;
  public persistent: boolean;
  public template: {
    correctly: true
    flag: false
    points: 0
  };

  constructor(){
  	this.submissions = []
  }
}
