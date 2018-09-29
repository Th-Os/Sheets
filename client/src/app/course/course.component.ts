import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { CourseService } from '../services/course.service';
import {Course} from '../models/course';
import {Student} from '../models/student';
import {Sheet} from '../models/sheet';
import {SheetService} from '../services/sheet.service';
import {StudentService} from '../services/student.service';
import {AnswerService} from '../services/answer.service';
import {TaskService} from '../services/task.service';
import {ExerciseDialogComponent} from '../exercise-dialog/exercise-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;
  sheets: Sheet[];
  students:Student[] = [];
  loadingSheets: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private sheetService: SheetService,
    private studentService: StudentService,
    private answerService: AnswerService,
    private taskService: TaskService,
    private location: Location,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.getCourse();
    this.getCourseSheets();
  }

  getCourse(): void {
    this.course = new Course('', '', '', 0);
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
    .subscribe(course => this.course = course);
  }

  delete(sheet: Sheet): void {
    if (window.confirm('Wollen Sie das Aufgabenblatt wirklich löschen?')) {
      const sheetIndex = this.course.sheets.indexOf(sheet);
      this.sheetService.deleteSheet(sheet).subscribe(_ => {
        if (this.sheets.length > 1) {
          this.sheets.splice(sheetIndex, 1);
        } else {
          this.sheets = [];
        }
        this.course.sheets = this.sheets;
        this.courseService.updateCourse(this.course);
      });
    }
  }

  getStudents() {
    this.sheets.forEach(sheet => {
      if(sheet.submissions == null || sheet.submissions.length <= 0) return
        this.sheetService.getSheetSubmissions(sheet._id.toString()).subscribe(subs => {
          subs.forEach(submission => {
            this.studentService.getStudent(submission.student).subscribe(
              student => {
                if(this.students.find(el => student.mat_nr.toString() === el.mat_nr.toString()) == null) {
                  student.status = ""
                  this.students.push(student)
                }
              },
              error => console.error( error ),
              () => {
              }
              )
          })
        })
    })
  }

  getCourseSheets(): void {
    this.loadingSheets = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheets(id)
    .subscribe(sheets => {
      this.sheets = sheets;
    }).add( () => {
      this.loadingSheets = false;
      this.getStudents();
    });
  }

  deleteSheet(sheet: Sheet): void {
    this.sheets = this.sheets.filter(s => s !== sheet);
    this.sheetService.deleteSheet(sheet);
  }

  update(sheet: Sheet): void {
    this.router.navigateByUrl('/sheets/' + sheet._id + '/edit');
  }

  add(): void {
    this.dialog.open(ExerciseDialogComponent, {
      width: 'auto',
      data: {courseId: this.route.snapshot.paramMap.get('id')}
    });
  }

  goBack(): void {
    this.location.back();
  }

  calculateCourseResults(){
    this.students.forEach(std => {
      this.calculateStudentStatus(std);
    })
  }

  calculateStudentStatus(student: Student): void {
    student.status = "nicht bestanden"
    let passedSheets = [];
    let numSheetsRequiredToPass = this.course.min_req_sheets;

    this.studentService.getStudentSubmissions(student._id).subscribe(res => {
      //console.log(res)
      res.forEach(sub => {
        let achievedPoints = 0;
        let maxPoints = 0;
        let passPercentage = 0;
        let correctSheet = null;

        //find correctSheet for submission (sub)
        this.sheets.find(el => {
          el.submissions.forEach(seachSub => {
            if(seachSub == null) return
            if(seachSub.toString() == sub._id) correctSheet = el;
          })
          return false});

        if(correctSheet != null) passPercentage = correctSheet.min_req_points / 100;

        this.answerService.getAnswers(sub._id).subscribe(answers => {
          answers.forEach(answer => {
            if(answer.corrected){
              achievedPoints += answer.achieved_points;

              //console.log(answer)

              this.taskService.getTask(answer.task).subscribe(task => {
                maxPoints += task.points;

                //console.log("New answer:")
                //console.log(maxPoints)
                //console.log(achievedPoints)
                //console.log(passPercentage)

                if(achievedPoints >= maxPoints * passPercentage){
                  //console.log(passedSheets)
                  if(!passedSheets.includes(sub._id)){
                    passedSheets.push(sub._id);
                  } 
                }else{
                  if(passedSheets.includes(sub._id)){
                    var index = passedSheets.indexOf(sub._id);
                    if (index > -1) {
                      passedSheets.splice(index, 1);
                    }
                  }
                }

                console.log(passedSheets)

                if(passedSheets.length >= numSheetsRequiredToPass) {
                  student.status = "bestanden"
                }else{
                  student.status = "nicht bestanden"
                }
              })
            }
          })
        })
      })
    })
  }

}
