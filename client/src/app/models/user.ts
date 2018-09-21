import {Course} from './course';
import {Role} from './role';

export class User {
  _id: string;
  username: string;
  password: string;
  forename: string;
  lastname: string;
  role: Role;
  courses: string; // Todo: Probably replace with Course[] later
}
