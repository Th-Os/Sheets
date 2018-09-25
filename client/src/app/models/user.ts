import {Course} from './course';
import {Role} from './role';

export class User {
  _id: string;
  username: string;
  password: string;
  forename: string;
  lastname: string;
  //role: Role;
  role: string; // Todo: Replace depending on, if role should be objectId or string
  courses: Course[];
}
