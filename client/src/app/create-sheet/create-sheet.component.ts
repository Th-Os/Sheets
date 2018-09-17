import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

import {Sheet} from '../classes/sheet';
import {Exercise} from '../classes/exercise';
import {Task} from '../classes/task';
import {Solution} from '../classes/solution';
import {SheetService} from '../services/sheet.service';
import {ExerciseService} from '../services/exercise.service';
import {TaskService} from '../services/task.service';
import {SolutionService} from '../services/solution.service';

@Component({
  selector: 'app-create-sheet',
  templateUrl: './create-sheet.component.html',
  styleUrls: ['./create-sheet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateSheetComponent implements OnInit {

  sheet: Sheet;
  regexExpression = '';
  // Todo: Use correct pattern
  regexPattern = '[a-zA-Z0-9]+//+{b}';
  regexValid = true;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private exerciseService: ExerciseService,
    private taskService: TaskService,
    private solutionService: SolutionService
  ) { }

  ngOnInit() {
    this.sheet = new Sheet();
    this.getSheet(this.route.snapshot.paramMap.get('id'));
  }

  getSheet(sheetId: string): void {
    this.sheetService.getSheet(sheetId)
      .subscribe(sheet => {
        this.sheet = sheet;

        if (Array.isArray(this.sheet.exercises) && this.sheet.exercises.length > 0) {
          this.getExercises(sheetId);
        } else if (!Array.isArray(this.sheet.exercises)) {
          this.sheet.exercises = [];
        }
      });
  }

  getExercises(sheetId: string): void {
    this.exerciseService.getExercises(sheetId).subscribe(exercises => {
      this.sheet.exercises = exercises;

      this.sheet.exercises.forEach(ex => {
        if (Array.isArray(ex.tasks) && ex.tasks.length > 0) {
          this.getTasks(ex._id.toString(), ex);
        } else if (!Array.isArray(ex.tasks)) {
          ex.tasks = [];
        }
      });
    });
  }

  getTasks(exerciseId: string, exercise: Exercise): void {
    this.taskService.getTasks(exerciseId).subscribe(tasks => {
      this.sheet.exercises[this.getIndexOfExercise(exercise)].tasks = tasks;

      this.sheet.exercises[this.getIndexOfExercise(exercise)].tasks.forEach(task => {
        if (task.solution) {
          this.getSolution(task._id.toString(), exercise, task);
        }
      });
    });
  }

  getSolution(taskId: string, exercise: Exercise, task: Task): void {
    this.solutionService.getSolution(taskId).subscribe( solution => {
      if (solution[0].regex === undefined) {
        solution[0].regex = '';
      }
        this.sheet.exercises[this.getIndexOfExercise(exercise)].tasks[this.getIndexOfTask(exercise, task)].solution = solution[0];
    });
  }

  addExercise(): void {
    const newExercise = new Exercise();

    newExercise.name = 'Neue Aufgabe';
    newExercise.description = 'Beschreibung';
    newExercise.order = this.sheet.exercises.length;
    newExercise.tasks = [];
    newExercise.persistent = false;

    this.exerciseService.addExercise(this.route.snapshot.paramMap.get('id'), newExercise)
      .subscribe(exercise => {
        this.sheet.exercises.push(exercise[0]);
        this.sheetService.updateSheet(this.sheet);
      });
  }

  deleteExercise(exercise: Exercise): void {
    const index = this.getIndexOfExercise(exercise);

    if (window.confirm('Wollen Sie die Aufgabe wirklich löschen?')) {
      if (index >= 0) {

        this.exerciseService.deleteExercise(exercise).subscribe(res => {
          this.sheet.exercises.splice(index, 1);
          this.sheetService.updateSheet(this.sheet);
        });
      }
    }
  }

  addTask(exercise: Exercise): void {

    const exerciseIndex = this.getIndexOfExercise(exercise);

    const newTask = new Task();
    newTask.question = 'Neue Unteraufgabe';
    newTask.order = this.sheet.exercises[exerciseIndex].tasks.length;
    newTask.points = 0;

    this.taskService.addTask(exercise._id.toString(), newTask)
      .subscribe(task => {
        const newSolution = new Solution();
        newSolution.type = 'none';
        this.solutionService.addSolution(task[0]._id.toString(), newSolution).subscribe(solution => {
          task[0].solution = solution[0];
          this.sheet.exercises[exerciseIndex].tasks.push(task[0]);
          this.sheetService.updateSheet(this.sheet);
        });
      });
  }

  deleteTask(exercise: Exercise, task: Task): void {
    const exerciseIndex = this.getIndexOfExercise(exercise);
    const taskIndex = this.getIndexOfTask(exercise, task);

    if (window.confirm('Wollen Sie die Teilaufgabe wirklich löschen?')) {
      if (taskIndex >= 0) {
        this.taskService.deleteTask(task).subscribe(res => {
          this.sheet.exercises[exerciseIndex].tasks.splice(taskIndex, 1);
          this.sheetService.updateSheet(this.sheet);
        });
      }
    }
  }

  checkAndAddRegex(exercise: Exercise, task: Task): void {
    if (this.regexExpression.match(this.regexPattern)) {
      this.regexValid = true;
      this.sheet.exercises[this.getIndexOfExercise(exercise)]
        .tasks[this.getIndexOfTask(exercise, task)]
        .solution.regex += this.regexExpression;
      this.regexExpression = '';
    } else {
      this.regexValid = false;
    }
  }

  saveProgress(): void {
    this.sheetService.updateSheet(this.sheet);
    this.sheet.exercises.forEach(exercise => {
      this.exerciseService.updateExercise(exercise);
      exercise.tasks.forEach(task => {
        this.taskService.updateTask(task);
        this.solutionService.updateSolution(task.solution);
      });
    });
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
