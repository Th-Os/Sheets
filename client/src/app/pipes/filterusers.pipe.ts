import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../models/user';

@Pipe({
  name: 'filterUsersPipe'
})
export class FilterusersPipe implements PipeTransform {

  transform(users: User[], role: string): User[] {
    const filteredUsers = [];
    users.forEach(user => {
      if (user.role.name === role) {
        filteredUsers.push(user);
      }
    });
    return filteredUsers;
  }

}
