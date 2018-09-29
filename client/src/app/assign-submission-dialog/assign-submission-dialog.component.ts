import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectionList} from '@angular/material';

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

  @ViewChild('submissionsList') submissionsList: MatSelectionList;

  submissions: Submission[];

  loadingUsers: boolean = false;
  users: User[];

  selectedSubmissions: Submission[] = [];
  selectedUser: User;
  // selectAll = false;
  numberToAssign = -1;

  constructor(private userService: UserService,
              private submissionService: SubmissionService,
              public dialogRef: MatDialogRef<AssignSubmissionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {submissions: Submission[] }) { }

  ngOnInit() {
    this.submissions = this.data.submissions;
    this.getUsers();
  }

  // Get all users to assign submissions to
  getUsers(): void {
    this.loadingUsers = true;
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.error( error ),
      () => this.loadingUsers = false
    );
  }

  /*selectSubmissions(): void {
    if (this.selectAll) {
      this.submissionsList.selectAll();
    } else {
      this.submissionsList.deselectAll();
    }
  }*/

  // Select multiple submissions by slider
  selectPercentage(): void {
    this.submissionsList.options.forEach((option, index) => {
      if (index <= this.numberToAssign) {
        option._setSelected(true);
      } else {
        option._setSelected(false);
      }
    });
  }

  // Select multiple submissions by holding down shift-key
  selectMultiple(event: MouseEvent): void {
    if (event.shiftKey) {
      const selectedOptions = this.submissionsList.selectedOptions.selected;
      if (selectedOptions.length === 2) {
        let indexFirstOption: number;
        let indexSecondOption: number;
        this.submissionsList.options.forEach((option, index) => {
          if (selectedOptions[0] === option) {
            indexFirstOption = index;
          }
          if (selectedOptions[1] === option) {
            indexSecondOption = index;
          }
        });
        this.submissionsList.options.forEach((option, index) => {
          if (index >= indexFirstOption && index <= indexSecondOption) {
            option._setSelected(true);
          }
        });
      } else if (selectedOptions.length > 2) {
        this.submissionsList.options.forEach(option => option._setSelected(false));
      }
    }
  }

  // When pressing save-button assign user to selected submissions
  onSubmit(): void {
    const updatedSubmissions = [];
    this.selectedSubmissions.forEach(submission => {
      submission.user = this.selectedUser;
      updatedSubmissions.push(this.submissionService.updateSubmission(submission));
    });
    this.dialogRef.close(updatedSubmissions);
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

}
