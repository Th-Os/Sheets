import {Sheet} from './sheet';

export class Course {

  constructor(
    public name: string,
    public faculty: string,
    public semester: string,
    public min_req_sheets: number,
    public sheets?: Sheet[],
    public _id?: string,
  ) {  }
}
