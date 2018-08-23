import {Sheet} from "./sheet";

export class Course {
  id: number;
  name: string;
  sheets: Sheet[];
  faculty: string;
  semester: string;
  min_req_sheets: number;
}
