import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material';

import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {UserService} from '../services/user.service';
import {CourseService} from '../services/course.service';
import {SubmissionService} from '../services/submission.service';
import {AnswerService} from '../services/answer.service';
import {StudentService} from '../services/student.service';
import {User} from '../models/user';
import {Course} from '../models/course';
import {Submission} from '../models/submission';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  users: User[];
  usersCourses: Course[];
  loadingUsers = false;
  loggedInUser: any;
  viewProfile = false;
  submissionProgress = [];
  userProgress = [];

  constructor(private location: Location,
              private userService: UserService,
              private courseService: CourseService,
              private submissionService: SubmissionService,
              private answerService: AnswerService,
              private studentService: StudentService,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    // Get user data from local storage
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

    // Get courses a user is added to
    this.getCoursesOfUser();

    // Get users, then calculate correction progress for each user
    this.getUsers().then(_ =>  this.calculateProgressForUsers());

    // Calculate progress for logged in user
    this.calculateProgressForSubmissions();
  }

  // Get all users
  getUsers(): Promise<Boolean> {
    this.loadingUsers = true;
    return new Promise<Boolean>(resolve => {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        this.loadingUsers = false;
        resolve(true);
      });
    });
  }

  // Get courses a user is added to for later display
  getCoursesOfUser(): void {
    this.usersCourses = [];
    this.loggedInUser.courses.forEach(courseId => {
      this.courseService.getCourse(courseId).subscribe(course => {
        this.usersCourses.push(course);
      });
    });
  }

  // Get all submissions for a user
  getSubmissionsForUser(userId: string): Promise<Submission[]> {
    return new Promise<Submission[]>(resolve => {
      this.submissionService.getSubmissionsForUser(userId).subscribe(submissions => {
        if (submissions) {
          resolve(submissions);
        } else {
          resolve([]);
        }
      });
    });
  }

  // Get student for each submission and add it to it
  getStudents(submissions: Submission[]): Promise<Submission[]> {
    return new Promise<Submission[]>(resolve => {
      for (let i = 0; i < submissions.length; i++) {
        this.studentService.getStudent(submissions[i].student).subscribe(student => {
          submissions[i].student = student;
          if (i === submissions.length - 1) {
            resolve(submissions);
          }
        });
      }
    });
  }

  // Get answers for each submission
  getAnswers(submissions: Submission[]): Promise<Submission[]> {
    return new Promise<Submission[]>(resolve => {
      for (let i = 0; i < submissions.length; i++) {
        this.answerService.getAnswers(submissions[i]._id).subscribe(answers => {
          submissions[i].answers = answers;
          if (i === submissions.length - 1) {
            resolve(submissions);
          }
        });
      }
    });
  }

  // Calculate correction progress for each submission
  calculateProgressForSubmissions(): void {
    this.getSubmissionsForUser(this.loggedInUser._id).then(submissions => {
      this.getStudents(submissions).then(submissionsWithStudents => {
        this.getAnswers(submissionsWithStudents).then(submissionsWithAnswers => {
          submissionsWithAnswers.forEach(submission => {
            let answerCount = 0;
            let corrected = 0;
            submission.answers.forEach(answer => {
              answerCount++;
              if (answer.corrected) {
                corrected++;
              }
            });
            // Todo: Add sheet name if possible to sort by sheet?
            this.submissionProgress.push({sheetName: '',
              studentName: `${submission.student.name} ${submission.student.lastname}` ,
              progress: (corrected / answerCount) * 100});
          });
        });
      });
    });
  }

  // Calculate entire correction progress for a user
  calculateProgressForUsers(): Promise<Boolean> {
    return new Promise<Boolean>(resolve => {
      for (let j = 0; j < this.users.length; j++) {
        let needsHelp = false;
        this.getSubmissionsForUser(this.users[j]._id).then(submissions => {
          this.getAnswers(submissions).then(submissionsWithAnswers => {
            let answerCount = 0;
            let corrected = 0;
            for (let i = 0; i < submissionsWithAnswers.length; i++) {
              submissionsWithAnswers[i].answers.forEach(answer => {
                answerCount++;
                if (answer.corrected) {
                  corrected++;
                }
                if (answer.help) {
                  needsHelp = true;
                }
              });
              this.userProgress.push({userId: this.users[j]._id ,
                progress: (corrected / answerCount) * 100,
                help: needsHelp});
              if (j === this.users.length - 1 && i === submissionsWithAnswers.length - 1) {
                resolve(true);
              }
            }
          });
        });
      }
    });
  }

  // Get correction progress for a user from array calculated before
  getUserProgress(userId: string): number {
    let progress = 0;
    this.userProgress.forEach(user => {
      if (user.userId === userId) {
        progress = user.progress;
      }
    });
    return progress;
  }

  // Check if user needs help
  userNeedsHelp(userId: string): boolean {
    let needsHelp = false;
    this.userProgress.forEach(user => {
      if (user.userId === userId && user.help) {
        needsHelp = true;
      }
    });
    return needsHelp;
  }

  // Delete user
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

  // Show dialog to add user
  add(): void {
    this.showEditDialog(true, false, new User());
  }

  // Show dialog to update user
  update(user: User): void {
    this.showEditDialog(false, false, user);
  }

  // Show dialog to add course(s) to user
  addCourseToTutor(user: User): void {
    this.showEditDialog(false, true, user);
  }

  // Show dialog
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
        // Update user
        this.users[userIndex] = result;
        // Update local storage
        const localUser = JSON.parse(localStorage.getItem('currentUser'));
        localUser.username = result.username;
        localUser.password = result.password;
        localUser.forename = result.forename;
        localUser.lastname = result.lastname;
        localStorage.role = result.role;
        localUser.courses = result.courses;
        localStorage.setItem('currentUser', JSON.stringify(localUser));
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
