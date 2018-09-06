import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {ViewEncapsulation} from '@angular/core';

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
  exerciseArray: Exercise[];
  taskArray: Task[];

  title = 'Neues Aufgabenblatt';
  type: string;
  answers: string;
  regex: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    // Todo: Test
    /*this.getSheet();

    if (this.sheet.exercises) {
      this.exerciseArray = this.sheet.exercises;
    } else {
      this.exerciseArray = new Array();
      this.taskArray = new Array();
    }*/

    // Testing -->
    this.exerciseArray = new Array();
    this.taskArray = new Array();

    this.solution = new Solution();
    this.solution.type = 'number';
    this.solution.number = 10;

    this.exercise = new Exercise();
    this.exercise.name = 'Bla';
    this.exercise.description = 'Blablabla';
    this.exercise.order = 0;

    this.task = new Task();
    this.task.question = 'Blublub';
    this.task.order = 0;
    this.task.solution = this.solution;
    this.taskArray.push(this.task);

    this.exercise.tasks = this.taskArray;
    this.exerciseArray.push(this.exercise);

    this.sheet = new Sheet();
    this.sheet.exercises = this.exerciseArray;
    // <--
  }

  getSheet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheet(id)
      .subscribe(sheet => this.sheet = sheet);
  }

  addExercise(): void {
    this.exercise = new Exercise();

    this.exercise.name = '';
    this.exercise.description = '';
    this.exercise.order = this.sheet.exercises.length;
    this.exercise.tasks = [];

    this.sheet.exercises.push(this.exercise);

    //this.exerciseArray.push(this.exercise);

    /*this.exercise.task.push(this.task);

    this.exerciseService.updateExercise(this.exercise)
      .subscribe(exercise => {
        console.log(exercise.task);
        this.tasks.push(exercise.task);
      });*/

    // Todo: Send exercise to server (update sheet)
  }

  addTask(exerciseNum: number): void {
    this.task = new Task();
    this.solution = new Solution();
    this.task.solution = this.solution;

    console.log('ExerciseArray: ' + this.exerciseArray.length + ' Stelle: ' + exerciseNum);
    //this.taskArray.push(this.task);
    this.exerciseArray[exerciseNum].tasks.push(this.task);

    // Todo: Send task to server (update exercise)
  }

  goBack(): void {
    this.location.back();
  }

}
