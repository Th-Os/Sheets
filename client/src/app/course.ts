import {Sheet} from "./sheet";

export class Course {

  constructor(
    public _id: number,
    public name: string,
    public faculty: string,
    public semester: string,
    public min_req_sheets: number,
    public sheets?: Sheet[],
  ) {  }
}
