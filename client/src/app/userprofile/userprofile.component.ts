import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material';

import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {UserService} from '../services/user.service';
import {CourseService} from '../services/course.service';
import {SubmissionService} from '../services/submission.service';
import {User} from '../models/user';
import {Course} from '../models/course';
import {Submission} from '../models/submission';
import {Answer} from '../models/answer';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  users: User[];
  usersCourses: Course[];
  loadingUsers = false;
  //correctionProgress = 30;
  loggedInUser: any;
  viewProfile = false;

  //submissions: Submission[];
  correctionProgress = [];

  constructor(private location: Location,
              private userService: UserService,
              private courseService: CourseService,
              private submissionService: SubmissionService,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedInUser = {
      _id: storedUser._id,
      username: storedUser.username,
      password: storedUser.password,
      forename: storedUser.forename,
      lastname: storedUser.lastname,
      role: storedUser.role,
      courses: storedUser.courses
    };
    this.getCoursesOfUser();

    // For own user profile
    this.calculateProgressionForSubmissions();

    /*this.getSubmissionsForUser(this.loggedInUser._id).then(_ => {
      this.getAnswers().then(_ => this.calculateProgressionForSubmissions());
    });*/
  }

  getUsers(): void {
    this.loadingUsers = true;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.loadingUsers = false;
    });
  }

  getCoursesOfUser(): void {
    this.usersCourses = [];
    this.loggedInUser.courses.forEach(courseId => {
      this.courseService.getCourse(courseId).subscribe(course => {
        this.usersCourses.push(course);
      });
    });
  }

  getSubmissionsForUser(userId: string): Promise<Submission[]> {
    //this.submissions = [];
    return new Promise<Submission[]>(resolve => {
      this.submissionService.getSubmissionsForUser(userId).subscribe(submissions => {
        //this.submissions = submissions;
        resolve(submissions);
      });
    });
  }

  getAnswers(submissions: Submission[]): Promise<Submission[]> {
    return new Promise<Submission[]>(resolve => {
      submissions.forEach(submission => {
        submission.answers.forEach(answerObject => {
          this.submissionService.getAnswer(answerObject).subscribe(answer => {
            answerObject = answer;
            resolve(submissions);
          });
        });
      });
    });
  }

  calculateProgressionForSubmissions(): void {
    this.getSubmissionsForUser(this.loggedInUser._id).then(submissions => {
      this.getAnswers(submissions).then(filledSubmissions => {
        let answerCount = 0;
        let corrected = 0;
        let submissionCount = 0;
        // console.log('Größe: ' + filledSubmissions.length);
        filledSubmissions.forEach(submission => {
          submissionCount++;
          submission.answers.forEach(answer => {
            answerCount++;
            if (answer.corrected) {
              corrected++;
            }
          });
          // console.log('fortschritt: ' + corrected + ' ' + answerCount);
          this.correctionProgress.push({name: 'Abgabe ' + submissionCount, progress: (corrected / answerCount) * 100});
        });
      });
    });
  }

  calculateProgressionForUser(userId: string): number {
    // Todo: Implement
    return 30;
  }

  delete(user: User): void {
    const userIndex = this.users.indexOf(user);
    this.userService.deleteUser(user).subscribe(_ => {
      if (this.users.length > 0) {
        this.users.splice(userIndex, 1);
      } else {
        this.users = [];
      }
    });
  }

  add(): void {
    this.showEditDialog(true, false, new User());
  }

  update(user: User): void {
    this.showEditDialog(false, false, user);
  }

  addCourseToTutor(user: User): void {
    this.showEditDialog(false, true, user);
  }

  showEditDialog(create: boolean, addCourse: boolean, user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: 'auto',
      data: { create: create, addCourse: addCourse, user: user }
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (!result) { return; }
      if (create) {
        this.users.push(result);
      } else {
        const userIndex = this.users.findIndex(c => c._id === user._id);
        this.users[userIndex] = result;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
