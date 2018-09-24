import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import {UserService} from '../services/user.service';
import {CourseService} from '../services/course.service';
import {User} from '../models/user';
import {Course} from '../models/course';
import {Role} from '../models/role';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  courses: Course[];
  //roles: Role[];
  roles: string[];  // Todo: Replace if role should be objectId
  user: User;
  saving = false;
  loggedInUser: any;

  constructor(private userService: UserService,
              private courseService: CourseService,
              public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {create: boolean, addCourse: boolean, user: User}) { }

  ngOnInit() {
    this.user = this.data.user;
    // Todo: Maybe find better way of not using hashed password (without hash could be hashed again)
    this.user.password = '';
    this.getCourses();
    this.getRoles();
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => this.courses = courses);
  }

  getRoles(): void {
    this.userService.getRoles().subscribe(roles => this.roles = roles);
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.saving = true;
    if (this.data.create) {
      this.userService.addUser(this.user)
        .subscribe(user => {
          this.dialogRef.close(user);
          this.saving = false;
        });
    } else {
      this.userService.updateUser(this.user)
        .subscribe(user => {
          this.dialogRef.close(user);
          this.saving = false;
        });
    }
  }

}
