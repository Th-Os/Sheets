import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ViewEncapsulation} from '@angular/core';

import {Exercise} from '../exercise';
import {ExerciseService} from '../exercise.service';
import {Task} from '../task';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExerciseComponent implements OnInit {

  exercise: Exercise;
  tasks: Task[];
  task: Task;

  title = 'Neues Aufgabenblatt';
  questionTitle: string;
  questionText: string;
  points: number;
  type: string;
  answers: string;
  regex: string;

  // Test
  iterator = -1;

  constructor(
    private location: Location,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    // Todo: Get exercise and fill tasks-array with respective tasks
    // Test
    this.tasks = new Array();
  }

  // Todo: Create new Task and load new task-array
  addTask(): void {
    this.task = new Task();
    this.task.questiontitle = this.questionTitle;
    this.task.questiontext = this.questionText;
    this.task.points = this.points;
    this.task.solution = this.answers;
    this.task.order = this.tasks.length;
    this.task.type = this.type;

    this.tasks.push(this.task);
    this.iterator++; // Test

    /*this.exercise.task.push(this.task);

    this.exerciseService.updateExercise(this.exercise)
      .subscribe(exercise => {
        console.log(exercise.task);
        this.tasks.push(exercise.task);
      });*/
  }

  goBack(): void {
    this.location.back();
  }
}
