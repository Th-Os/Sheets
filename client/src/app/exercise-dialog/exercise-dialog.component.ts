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
import {timeout} from 'rxjs/internal/operators';
import {reject} from 'q';

@Component({
  selector: 'app-exercise-dialog',
  templateUrl: './exercise-dialog.component.html',
  styleUrls: ['./exercise-dialog.component.css']
})
export class ExerciseDialogComponent implements OnInit {

  course: Course;
  sheets = [];
  useTemplate: boolean;
  selectedSheetId: number;
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
    this.getSheets(this.data.courseId);
  }

  getSheets(id: string): void {
    this.sheetService.getSheets(id)
      .subscribe(sheets => this.sheets = sheets );
  }

  create(): void {
    const newSheet = new Sheet();
    const currentTime = moment().toISOString();
    newSheet.submissiondate = currentTime;
    newSheet.min_req_points = 0;
    newSheet.persistent = false;
    newSheet.exercises = [];

    if (this.useTemplate) {
      this.fetchSheet(this.selectedSheetId.toString()).then(fetchedSheet => {
        newSheet.name = 'Vorlage: ' + fetchedSheet.name;
        this.sheetService.getSheets(this.data.courseId).subscribe(sheets => newSheet.order = sheets.length);
        this.fillSheet(newSheet).then(sheet => {
          this.router.navigateByUrl('/sheet/' + sheet._id + '/create');
          this.dialogRef.close();
        });
      });
    } else {
      newSheet.name = 'Neues Aufgabenblatt';
      this.sheetService.getSheets(this.data.courseId).subscribe(sheets => newSheet.order = sheets.length);
      this.sheetService.addSheet(this.data.courseId, newSheet)
        .subscribe(sheet => this.router.navigateByUrl('/sheet/' + sheet[0]._id + '/create'));
      this.dialogRef.close();
    }
  }

  fillSheet(newSheet: Sheet): Promise<Sheet> {
    return new Promise<Sheet>((resolve, reject) => {
      this.sheetService.addSheet(this.data.courseId, newSheet).subscribe(sheet => {
        newSheet._id = sheet[0]._id;

        for (let i = 0; i < this.fetchedSheet.exercises.length; i++) {
          const newExercise = new Exercise();
          newExercise.tasks = [];
          newExercise.persistent = false;
          newExercise.description = this.fetchedSheet.exercises[i].description;
          newExercise.name = this.fetchedSheet.exercises[i].name;
          newExercise.order = this.fetchedSheet.exercises[i].order;

          this.exerciseService.addExercise(newSheet._id.toString(), newExercise).subscribe(exercise => {
            for (let j = 0; j < this.fetchedSheet.exercises[i].tasks.length; j++) {
              const newTask = new Task();
              newTask.points = this.fetchedSheet.exercises[i].tasks[j].points;
              newTask.question = this.fetchedSheet.exercises[i].tasks[j].question;
              newTask.order = this.fetchedSheet.exercises[i].tasks[j].order;
              newTask.choices = this.fetchedSheet.exercises[i].tasks[j].choices;

              this.taskService.addTask(exercise[0]._id.toString(), newTask).subscribe(task => {
                this.solutionService.addSolution(task[0]._id.toString(), newTask.solution);
                resolve(newSheet);
              });
            }
          });
        }
      });
    });
  }

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

  getSolution(taskId: string, exercise: Exercise, task: Task): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getIndexOfExercise(exercise).then(exerciseIndex => {
        this.getIndexOfTask(exerciseIndex, task).then(taskIndex => {
          this.solutionService.getSolution(taskId).subscribe( solution => {
            if (solution[0].regex === undefined) {
              solution[0].regex = '';
            }
            if ((exerciseIndex && taskIndex) >= 0) {
              this.fetchedSheet.exercises[exerciseIndex].tasks[taskIndex].solution = solution[0];
              resolve(true);
            }
          });
        });
      });
    });
  }

  private getIndexOfExercise(exercise: Exercise): Promise<number> {
    return new Promise<number>(resolve => {
      const exerciseIndex = this.fetchedSheet.exercises.indexOf(exercise, 0);
      resolve(exerciseIndex);
    });
  }

  private getIndexOfTask(exerciseIndex: number, task: Task): Promise<number> {
    return new Promise<number>(resolve => {
      const taskIndex = this.fetchedSheet.exercises[exerciseIndex].tasks.indexOf(task, 0);
      resolve(taskIndex);
    });
  }

  onClose(create: boolean): void {
    if (create) {
      this.create();
    } else { this.dialogRef.close(); }
  }
}
