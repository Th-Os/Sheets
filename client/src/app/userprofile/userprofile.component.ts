import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material';

import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Course} from '../models/course';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  tutors: User[];
  loadingUsers = false;
  correctionProgress = 30;
  loggedInUser = 'tutor'; // Todo: get from local storage data later

  constructor(private location: Location,
              private userService: UserService,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTutors();
  }

  getTutors(): void {
    this.loadingUsers = true;
    this.userService.getUsers().subscribe(users => {
      this.tutors = users;
      this.loadingUsers = false;
    });
  }

  delete(user: User): void {
    const userIndex = this.tutors.indexOf(user);
    this.userService.deleteUser(user).subscribe(_ => {
      if (this.tutors.length > 0) {
        this.tutors.splice(userIndex, 1);
      } else {
        this.tutors = [];
      }
    });
  }

  add(): void {
    this.showEditDialog(true, false, new User());
  }

  update(user: User): void {
    this.showEditDialog(false, false, user);
  }

  addCourseTutor(user: User): void {
    this.showEditDialog(false, true, user);
  }

  updateOwnData(): void {
    // Todo: update own data from storage data + prohibit normal user from changing role and courses
    //this.showEditDialog(false, false, {});
  }

  showEditDialog(create: boolean, addCourse: boolean, user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: 'auto',
      data: { create: create, addCourse: addCourse, user: user }
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (!result) { return; }
      if (create) {
        this.tutors.push(result);
      } else {
        const userIndex = this.tutors.findIndex(c => c._id === user._id);
        this.tutors[userIndex] = result;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
