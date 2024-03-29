import {Course} from './course';
import {Role} from './role';

export class User {
  _id: string;
  username: string;
  password: string;
  forename: string;
  lastname: string;
  email: string;
  role: Role;
  courses: Course[];
}
