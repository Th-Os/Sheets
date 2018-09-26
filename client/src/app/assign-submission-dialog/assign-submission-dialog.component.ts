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
    const updatedSubmissons = [];
    this.selectedSubmissions.forEach(submission => {
      submission.user = this.selectedUser[0];
      updatedSubmissons.push(this.submissionService.updateSubmission(submission));
    });
    // Todo: Give back array of updated submissions to replace in sheet component
    this.dialogRef.close(updatedSubmissons);
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

}
