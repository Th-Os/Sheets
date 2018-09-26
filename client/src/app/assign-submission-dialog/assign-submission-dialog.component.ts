import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {UserService} from '../services/user.service';
import {SubmissionService} from '../services/submission.service';
import {User} from '../models/user';
import {Submission} from '../models/submission';

@Component({
  selector: 'app-assign-submission-dialog',
  templateUrl: './assign-submission-dialog.component.html',
  styleUrls: ['./assign-submission-dialog.component.css']
})
export class AssignSubmissionDialogComponent implements OnInit {

  submissions: Submission[];
  users: User[];
  selectedSubmissions: Submission[];
  selectedUser: User[];

  constructor(private userService: UserService,
              private submissionService: SubmissionService,
              public dialogRef: MatDialogRef<AssignSubmissionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {submissions: Submission[] }) { }

  ngOnInit() {
    this.submissions = this.data.submissions;
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(): void {
    this.selectedSubmissions.forEach(submission => {
      // console.log('Submission: ' + submission._id + ' User: ' + this.selectedUser[0]._id);
      submission.user = this.selectedUser[0];
      // console.log('bla: ' + JSON.stringify(submission));
      this.submissionService.updateSubmission(submission);
    });
    this.dialogRef.close(null);
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

}
