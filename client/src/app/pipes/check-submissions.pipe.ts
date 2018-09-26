import { Pipe, PipeTransform } from '@angular/core';
import {Course} from '../models/course';
import {Submission} from '../models/submission';

@Pipe({
  name: 'checkSubmissionsPipe'
})
export class CheckSubmissionsPipe implements PipeTransform {

  // Check if logged in user is added to submission and only show the ones he is added to
  transform(submissions: Submission[]): Submission[] {
    let visibleSubmissions = [];
    const localUser = JSON.parse(localStorage.getItem('currentUser'));
    if (localUser.role.name === 'admin') {
      visibleSubmissions = submissions;
    } else {
      submissions.forEach(submission => {
        if (submission.user === localUser._id) {
          visibleSubmissions.push(submission);
        }
      });
    }
    return visibleSubmissions;
  }
}
