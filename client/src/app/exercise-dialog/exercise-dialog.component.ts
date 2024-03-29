import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {Router} from '@angular/router';
import * as moment from 'moment';

import {Course} from '../models/course';
import {Sheet} from '../models/sheet';
import { CourseService } from '../services/course.service';
import {SheetService} from '../services/sheet.service';
import {ExerciseService} from '../services/exercise.service';
import {TaskService} from '../services/task.service';
import {SolutionService} from '../services/solution.service';
import {Exercise} from '../models/exercise';
import {Task} from '../models/task';
import {Solution} from '../models/solution';
import {SolutionRange} from '../models/solutionRange';

@Component({
  selector: 'app-exercise-dialog',
  templateUrl: './exercise-dialog.component.html',
  styleUrls: ['./exercise-dialog.component.css']
})
export class ExerciseDialogComponent implements OnInit {

  courses: Course[];
  sheets = [];
  useTemplate: boolean;
  selectedCourseId: string;
  selectedSheetId: string;
  fetchedSheet: Sheet;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {courseId: string},
    private router: Router,
    private courseService: CourseService,
    private sheetService: SheetService,
    private exerciseService: ExerciseService,
    private taskService: TaskService,
    private solutionService: SolutionService
    ) { }

  ngOnInit() {
    this.courses = [];
    this.getCourses().then(courses => {
      this.getSheets(courses);
    });
  }

  // Get all courses
  getCourses(): Promise<Course[]> {
    return new Promise<Course[]>((resolve, reject) => {
      this.courseService.getCourses().subscribe(courses => {
        if (courses.length > 0) {
          this.checkIfCourseHasSheets(courses).then(checkedCourses => resolve(checkedCourses));
        } else {
          resolve([]);
        }
      });
    });
  }

  // Check if a course has sheets. Gives back array with all courses that have at lest one sheet
  checkIfCourseHasSheets(courses: Course[]): Promise<Course[]> {
    const checkedCourses = [];
    return new Promise<Course[]>((resolve, reject) => {
      courses.forEach(course => {
        if (course.sheets.length > 0) {
          checkedCourses.push(course);
        }
      });
      resolve(checkedCourses);
    });
  }

  // Get all sheets for every course that has a sheet
  getSheets(courses: Course[]): void {
    courses.forEach(course => {
      this.sheetService.getSheets(course._id.toString())
      .subscribe(sheets => course.sheets = sheets );
    });
    this.courses = courses;
  }

  // For a sheet find the corresponding courseId
  findCourseIdOfSheet(courses: Course[], sheetId: string): void {
    courses.forEach(course => {
      course.sheets.forEach(sheet => {
        if (sheet._id === sheetId) {
          this.selectedCourseId = course._id;
        }
      });
    });
  }

  // Create a sheet
  create(): void {
    const newSheet = new Sheet();
    let submissiondate = moment();
    submissiondate = submissiondate.minutes(55).hour(23);
    newSheet.submissiondate = submissiondate.toISOString();
    newSheet.min_req_points = 0;
    newSheet.persistent = false;
    newSheet.exercises = [];

    // When template is selected get the selected sheet with all corresponding exercises, tasks and solutions.
    // Then create new sheet on basis of selected sheet. Otherwise just create new sheet.
    // When done route to sheet-creation-page
    if (this.useTemplate) {
      this.fetchSheet(this.selectedSheetId.toString()).then(fetchedSheet => {
        newSheet.name = 'Vorlage: ' + fetchedSheet.name;
        this.sheetService.getSheets(this.selectedCourseId.toString()).subscribe(sheets => newSheet.order = sheets.length);
        this.fillSheet(newSheet).then(sheet => {
          console.log(sheet)
          this.router.navigateByUrl('/sheets/' + sheet._id + '/create');
          this.dialogRef.close();
        });
      });
    } else {
      newSheet.name = 'Neues Aufgabenblatt';
      this.sheetService.getSheets(this.data.courseId).subscribe(sheets => newSheet.order = sheets.length);
      this.sheetService.addSheet(this.data.courseId, newSheet)
      .subscribe(sheet => this.router.navigateByUrl('/sheets/' + sheet[0]._id + '/create'));
      this.dialogRef.close();
    }
  }

  // Fill new sheet with exercises, tasks and solutions by adding each to db
  fillSheet(newSheet: Sheet): Promise<Sheet> {
    return new Promise<Sheet>((resolve, reject) => {
      this.sheetService.addSheet(this.data.courseId, newSheet).subscribe(sheet => {
        newSheet._id = sheet[0]._id;
        let newExercises: Exercise[] = [];
        for (let i = 0; i < this.fetchedSheet.exercises.length; i++) {
          const newExercise = new Exercise();
          newExercise.tasks = [];
          newExercise.persistent = false;
          newExercise.description = this.fetchedSheet.exercises[i].description;
          newExercise.name = this.fetchedSheet.exercises[i].name;
          newExercise.order = this.fetchedSheet.exercises[i].order;
          newExercises.push(newExercise);
        }

        this.exerciseService.addExercises(newSheet._id.toString(), newExercises).subscribe(exercises => {
          for (let i = 0; i < this.fetchedSheet.exercises.length; i++) {
            let newTasks: Task[] = [];
            for (let j = 0; j < this.fetchedSheet.exercises[i].tasks.length; j++) {
              const newTask = new Task();
              newTask.points = this.fetchedSheet.exercises[i].tasks[j].points;
              newTask.question = this.fetchedSheet.exercises[i].tasks[j].question;
              newTask.order = this.fetchedSheet.exercises[i].tasks[j].order;
              newTask.choices = this.fetchedSheet.exercises[i].tasks[j].choices;
              newTasks.push(newTask);
            }

              let correctExercise = exercises.find(el => el.order == this.fetchedSheet.exercises[i].order)

              this.taskService.addTasks(correctExercise._id.toString(), newTasks).subscribe(tasks => {

                for (let i = 0; i < this.fetchedSheet.exercises.length; i++) {
                  for (let j = 0; j < this.fetchedSheet.exercises[i].tasks.length; j++) {

                    const newSolution = new Solution();
                    newSolution.type = this.fetchedSheet.exercises[i].tasks[j].solution.type;
                    newSolution.range = new SolutionRange(0, 0);
                    newSolution.regex = '';
                    switch (newSolution.type) {
                      case 'none': {
                        break;
                      }
                      case 'freetext': {
                        newSolution.default_free_text = this.fetchedSheet.exercises[i].tasks[j].solution.default_free_text;
                        break;
                      }
                      case 'number': {
                        newSolution.number = this.fetchedSheet.exercises[i].tasks[j].solution.number;
                        break;
                      }
                      case 'range': {
                        newSolution.range.from = this.fetchedSheet.exercises[i].tasks[j].solution.range.from;
                        newSolution.range.to = this.fetchedSheet.exercises[i].tasks[j].solution.range.to;
                        break;
                      }
                      case 'regex': {
                        newSolution.regex = this.fetchedSheet.exercises[i].tasks[j].solution.regex;
                      }
                    }
                    if (this.fetchedSheet.exercises[i].tasks[j].solution.hint) {
                      newSolution.hint = this.fetchedSheet.exercises[i].tasks[j].solution.hint;
                    } else {
                      newSolution.hint = '';
                    }

                    let correctTask = tasks.find(el => el.order == this.fetchedSheet.exercises[i].tasks[j].order)

                    this.solutionService.addSolution(correctTask._id.toString(), newSolution).subscribe(_ => resolve(newSheet));
                  }
                }
              });
          }
        });
      });
    });
  }

  // Get sheet
  fetchSheet(sheetId: string): Promise<Sheet> {
    this.fetchedSheet = new Sheet();
    return new Promise<Sheet>((resolve, reject) => {
      this.sheetService.getSheet(sheetId)
      .subscribe(sheet => {
        this.fetchedSheet = sheet;
        if (Array.isArray(this.fetchedSheet.exercises) && this.fetchedSheet.exercises.length > 0) {
          this.getExercises(sheetId).then(value => resolve(this.fetchedSheet));
        } else if (!Array.isArray(this.fetchedSheet.exercises)) {
          this.fetchedSheet.exercises = [];
          resolve(this.fetchedSheet);
        }
      });
    });
  }

  // Get all exercises of sheet
  getExercises(sheetId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.exerciseService.getExercises(sheetId).subscribe(exercises => {
        this.fetchedSheet.exercises = exercises;
        this.fetchedSheet.exercises.forEach(ex => {
          if (Array.isArray(ex.tasks) && ex.tasks.length > 0) {
            this.getTasks(ex._id.toString(), ex).then(value => resolve(value));
          } else if (!Array.isArray(ex.tasks)) {
            ex.tasks = [];
            resolve(true);
          }
        });
      });
    });
  }

  // Get all tasks of exercise
  getTasks(exerciseId: string, exercise: Exercise): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getIndexOfExercise(exercise).then(exerciseIndex => {
        this.taskService.getTasks(exerciseId).subscribe(tasks => {
          if (exerciseIndex >= 0) {
            this.fetchedSheet.exercises[exerciseIndex].tasks = tasks;
            this.fetchedSheet.exercises[exerciseIndex].tasks.forEach(task => {
              if (task.solution) {
                this.getSolution(task._id.toString(), exercise, task).then(value2 => resolve(value2));
              }
            });
          }
        });
      });
    });
  }

  // Get solutions for corresponding task
  getSolution(taskId: string, exercise: Exercise, task: Task): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getIndexOfExercise(exercise).then(exerciseIndex => {
        this.getIndexOfTask(exerciseIndex, task).then(taskIndex => {
          this.solutionService.getSolution(taskId).subscribe( sol => {
            let solution = null;
            if(sol != null){
              if(sol.length > 0){
                solution = sol[0];
                if (solution.regex === undefined) {
                  solution.regex = '';
                }
                if ((exerciseIndex && taskIndex) >= 0) {
                  this.fetchedSheet.exercises[exerciseIndex].tasks[taskIndex].solution = solution;
                  resolve(true);
                }
              }
            }
          });
        });
      });
    });
  }

  // Get the index of an exercise
  private getIndexOfExercise(exercise: Exercise): Promise<number> {
    return new Promise<number>(resolve => {
      const exerciseIndex = this.fetchedSheet.exercises.indexOf(exercise, 0);
      resolve(exerciseIndex);
    });
  }

  // Get the index of a task
  private getIndexOfTask(exerciseIndex: number, task: Task): Promise<number> {
    return new Promise<number>(resolve => {
      const taskIndex = this.fetchedSheet.exercises[exerciseIndex].tasks.indexOf(task, 0);
      resolve(taskIndex);
    });
  }

  // Either create sheet or close dialog
  onClose(create: boolean): void {
    if (create) {
      this.findCourseIdOfSheet(this.courses, this.selectedSheetId);
      this.create();
    } else { this.dialogRef.close(); }
  }
}
