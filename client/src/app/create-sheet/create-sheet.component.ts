import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

import {Exercise} from '../exercise';
import {Task} from '../task';
import {Sheet} from '../sheet';
import {Solution} from '../solution';
import {ExerciseService} from '../exercise.service';
import {SheetService} from '../sheet.service';


@Component({
  selector: 'app-create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrls: ['./create-sheet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateSheetComponent implements OnInit {

  sheet: Sheet;
  exercise: Exercise;
  task: Task;
  solution: Solution;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    // Todo: Test
    /*this.getSheet(+this.route.snapshot.paramMap.get('id'));

    if (!this.sheet.exercises) {

      this.solution = new Solution();
      this.task = new Task();
      this.exercise = new Exercise();

      this.task.solution = this.solution;
      this.exercise.tasks = [];
      this.exercise.tasks.push(this.task);

      this.sheet.exercises = [];
      this.sheet.exercises.push(this.exercise);
    }*/

    // Testing -->
    this.sheet = new Sheet();
    this.exercise = new Exercise();
    this.task = new Task();
    this.solution = new Solution();

    this.solution.type = 'number';
    this.solution.number = 10;
    this.solution.regex = '';

    this.task.question = 'Blublub';
    this.task.order = 0;
    this.task.points = 10;
    this.task.solution = this.solution;

    this.exercise.name = 'Bla';
    this.exercise.description = 'Blablabla';
    this.exercise.order = 0;
    this.exercise.tasks = [];

    this.exercise.tasks.push(this.task);

    this.sheet.exercises = [];
    this.sheet.exercises.push(this.exercise);

    this.sheet.name = 'Neues Aufgabenblatt';
    // <--
  }

  getSheet(sheetId: number): void {
    this.sheetService.getSheet(sheetId)
      .subscribe(sheet => this.sheet = sheet);
  }

  addExercise(): void {
    const newExercise = new Exercise();

    newExercise.name = '';
    newExercise.description = '';
    newExercise.order = this.sheet.exercises.length;
    newExercise.tasks = [];

    this.sheet.exercises.push(newExercise);

    // Todo: Probably only update exercises not whole sheet
    /*this.sheetService.updateSheet(this.sheet)
      .subscribe(sheet => {
        this.sheet = sheet;
      });*/
  }

  deleteExercise(exercise: Exercise): void {
    const index = this.getIndexOfExercise(exercise);

    if (window.confirm('Wollen Sie die Aufgabe wirklich löschen?')) {
      if (index >= 0) {
        this.sheet.exercises.splice(index, 1);

        /* this.sheetService.updateSheet(this.sheet)
           .subscribe(sheet => {
             this.sheet = sheet;
           });*/
      }
    }
  }

  deleteTask(exercise: Exercise, task: Task): void {
    const exerciseIndex = this.getIndexOfExercise(exercise);
    const taskIndex = this.getIndexOfTask(exercise, task);

    if (window.confirm('Wollen Sie die Teilaufgabe wirklich löschen?')) {
      if (taskIndex >= 0) {
        this.sheet.exercises[exerciseIndex].tasks.splice(taskIndex, 1);

        /*this.sheetService.updateSheet(this.sheet)
          .subscribe(sheet => {
            this.sheet = sheet;
          });*/
      }
    }
  }

  addTask(exercise: Exercise): void {

    const exerciseIndex = this.getIndexOfExercise(exercise);

    const newTask = new Task();
    newTask.question = '';
    newTask.order = this.sheet.exercises[exerciseIndex].tasks.length;
    newTask.solution = new Solution();
    newTask.solution.type = 'none';

    this.sheet.exercises[exerciseIndex].tasks.push(newTask);

    // Todo: Probably only update tasks not whole sheet
    /*this.sheetService.updateSheet(this.sheet)
      .subscribe(sheet => {
        this.sheet = sheet;
      });*/
  }

  saveProgress(): void {
    /*this.sheetService.updateSheet(this.sheet)
      .subscribe(sheet => {
        this.sheet = sheet;
      });*/
  }

  private getIndexOfExercise(exercise: Exercise): number {
    let exerciseIndex = -1;
    this.sheet.exercises.forEach(ex => {
      exerciseIndex = this.sheet.exercises.indexOf(exercise, 0);
    });
    return exerciseIndex;
  }

  private getIndexOfTask(exercise: Exercise, task: Task): number {
    let exerciseIndex = -1;
    let taskIndex = -1;
    this.sheet.exercises.forEach(ex => {
      exerciseIndex = this.sheet.exercises.indexOf(exercise, 0);
    });
    this.sheet.exercises[exerciseIndex].tasks.forEach(ta => {
      taskIndex = this.sheet.exercises[exerciseIndex].tasks.indexOf(task, 0);
    });
    return taskIndex;
  }

  goBack(): void {
    this.location.back();
  }

}
