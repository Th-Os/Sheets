import { Pipe, PipeTransform } from '@angular/core';
import {Course} from '../models/course';

@Pipe({
  name: 'checkCoursesPipe'
})
export class CheckCoursesPipe implements PipeTransform {

  // Check if logged in user is "subscribed" to courses and only show the ones he is subscribed to
  transform(courses: Course[]): Course[] {
    let visibleCourses = [];
    const localUser = JSON.parse(localStorage.getItem('currentUser'));
    if (localUser.role.name === 'admin' || 'lecturer') {
      visibleCourses = courses;
    } else {
      localUser.courses.forEach(storageCourseId => {
        courses.forEach(course => {
          if (storageCourseId === course._id) {
            visibleCourses.push(course);
          }
        });
      });
    }
    return visibleCourses;
  }

}
