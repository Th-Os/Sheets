import {Submission} from './submission';
import {Exercise} from './exercise';

export class Sheet {
  public _id: number;
  public name: string;
  public order: number;
  public submissions: Submission[];
  public submissiondate: string;
  public exercises: Exercise[];
  public  min_req_points: number;
  public persistent: boolean;

  constructor(){
  	this.submissions = []
  }
}
