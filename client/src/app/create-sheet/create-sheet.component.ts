import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

import {Sheet} from '../models/sheet';
import {Exercise} from '../models/exercise';
import {Task} from '../models/task';
import {Solution} from '../models/solution';
import {SolutionRange} from '../models/solutionRange';
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
/**
 * CreateSheet Component
 * Ermöglicht die Erstellung, Bearbeitung und Löschung
 * von Aufgaben und Teilaufgaben eines Übungsblattes
 */
export class CreateSheetComponent implements OnInit {

  loadingSheet: boolean = false;
  sheet: Sheet;
  originalSheet: Sheet;
  selectedExercise: string = null;
  selectedTask: string = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private exerciseService: ExerciseService,
    private taskService: TaskService,
    private solutionService: SolutionService,
  ) { }

  ngOnInit() {
    this.getSheet();
  }

  /**
   * Holt das Übungsblatt von Server und lädt alle dazugehörigen
   * Übungen und Teilaufgaben.
   */
  getSheet(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadingSheet = true;
    this.sheetService.getSheet(id).subscribe(
      sheet => this.sheet = sheet,
      error => console.log(error),
      () => {
        if (this.sheet.exercises.length === 0) this.loadingSheet = false;
        else {
          this.sheetService.getSheetExercises(this.sheet._id).subscribe(
            exercises => this.sheet.exercises = exercises,
            error => console.error( error ),
            () => {
              this.sheet.exercises.forEach( (exercise, index) => {
                if (exercise.tasks.length > 0) {
                  this.taskService.getTasks(exercise._id).subscribe(
                    tasks => this.sheet.exercises[index].tasks = tasks,
                    error => console.error( error ),
                    () => {
                      if (this.sheet.exercises.length - 1 === index) {
                        if (this.selectedExercise == null && this.sheet.exercises.length > 0) {
                          this.selectedExercise = this.sheet.exercises[0]._id;
                        }
                        this.originalSheet = Object.assign({}, this.sheet);
                        this.loadingSheet = false
                      }
                    }
                  )
                } else if (this.sheet.exercises.length - 1 === index) {
                  if (this.selectedExercise == null && this.sheet.exercises.length > 0) {
                    this.selectedExercise = this.sheet.exercises[0]._id;
                  }
                  this.originalSheet = Object.assign({}, this.sheet);
                  this.loadingSheet = false;
                }
              });
            }
          );
        }
      }
    );
  }

  /**
   * Wird aufgerufen, wenn eine Teilaufgabe geändert wurde.
   * Fügt die Änderungen in das Übungsblattobjekt ein.
   * @param updatedTask
   */
  onTaskUpdated(updatedTask: Task): void {
    this.checkSubmissionCorrection();
    this.loadingSheet = true;
    this.sheet.exercises.forEach( (exercise, exerciseIndex) => {
      exercise.tasks.forEach((task, taskIndex) => {
        if (task._id === updatedTask._id) {
          this.sheet.exercises[exerciseIndex].tasks[taskIndex] = updatedTask;
          this.originalSheet = Object.assign({}, this.sheet);
          this.loadingSheet = false;
          return;
        }
      })
    })
  }

  /**
   * Wird aufgerufen, wenn eine Aufgabe geändert wurde.
   * Fügt die Änderungen in das Übungsblattobjekt ein.
   * @param updatedExercise geänderte Aufgabe
   */
  onExerciseUpdated(updatedExercise: Exercise): void {
    this.checkSubmissionCorrection();
    this.loadingSheet = true;
    this.sheet.exercises.forEach( (exercise, exerciseIndex) => {
      if (exercise._id === updatedExercise._id) {
        this.sheet.exercises[exerciseIndex] = updatedExercise;
        this.taskService.getTasks(exercise._id).subscribe(
          tasks => this.sheet.exercises[exerciseIndex].tasks = tasks,
          error => console.error( error ),
          () => {
            this.originalSheet = Object.assign({}, this.sheet);
            this.loadingSheet = false
          }
        )
      }
    })
  }

  /**
   * Wird aufgerufen, wenn eine Aufgabe erstellt werden soll.
   * Sind bereits Abgaben für das Übungsblatt hochgeladen worden,
   * werden diese zuerst gelöscht.
   * @param exercise
   */
  onAddExercise() {
    console.log(this.sheet)
    if (this.sheet.submissions.length === 0) {
      this.addExercise()
    } else if (window.confirm('Für das Arbeitsblatt wurden bereits Abgaben hochgeladen. Wenn Sie eine neue Aufgabe erstellen ' +
                              'werden die Abgaben des Blattes mitgelöscht und müssen neu hochgeladen werden. ' +
                              'Aufgabe wirklich erstellen?')) {
      this.sheetService.deleteSubmissions(this.sheet).subscribe(
        () => this.sheet.submissions = [],
        error => console.error( error ),
        () => this.addExercise()
      )
    }
  }

  /**
   * Fügt dem Übungsblatt eine neue Aufgabe hinzu.
   */
  addExercise(): void {
    this.loadingSheet = true;
    let newExercise = new Exercise();
    newExercise.name = 'Neue Aufgabe';
    newExercise.description = 'Beschreibung';
    newExercise.order = this.sheet.exercises.length;
    newExercise.tasks = [];
    newExercise.persistent = false;

    this.exerciseService.addExercises(this.route.snapshot.paramMap.get('id'), [newExercise])
      .subscribe(
        exercise =>  this.sheet.exercises.push(exercise[0]),
        error => console.error( error ),
        () => {
          this.originalSheet = Object.assign({}, this.sheet);
          this.selectedExercise = this.sheet.exercises[this.sheet.exercises.length -1]._id;
          this.addTask()
        });
  }

  /**
   * Wird aufgerufen, wenn eine Aufgabe gelöscht werden soll.
   * Sind bereits Abgaben für das Übungsblatt hochgeladen worden,
   * werden diese zuerst gelöscht.
   * @param exercise
   */
  onDeleteExercise(exercise: Exercise): void {
    if (this.sheet.submissions.length === 0) {
      this.deleteExercise(exercise);
    } else if (window.confirm('Für das Arbeitsblatt wurden bereits Abgaben hochgeladen. Wenn Sie die Aufgabe löschen ' +
      'werden die Abgaben des Blattes gelöscht und müssen neu hochgeladen werden. ' +
      'Aufgabe wirklich löschen?')) {
      this.sheetService.deleteSubmissions(this.sheet).subscribe(
        () => this.sheet.submissions = [],
        error => console.error( error ),
        () => this.deleteExercise(exercise)
      )
    }
  }

  /**
   * Löscht die Aufgabe vom Server
   * @param exercise Aufgabe, die gelöscht werden soll
   */
  deleteExercise(exercise: Exercise): void {
    if (this.sheet.submissions.length > 0 || window.confirm('Wollen Sie die Aufgabe wirklich löschen?')) {
      this.loadingSheet = true;
      let index = this.sheet.exercises.indexOf(exercise);
      this.sheet.exercises.splice(index, 1);
      this.sheetService.updateSheet(this.sheet).subscribe(
        sheet => console.log(sheet),
        error => {
          console.error( error );
          this.sheet.exercises.splice(index, 0, exercise)
          this.loadingSheet = false;
        },
        () => {
          this.exerciseService.deleteExercise(exercise).subscribe(
            exercise => console.log(exercise),
            error => console.error( error ),
            () => {
              if (this.selectedExercise === exercise._id) {
                this.selectedExercise = null;
              }
              this.originalSheet = Object.assign({}, this.sheet);
              this.loadingSheet = false
            }
          );
        }
      )
    }
  }

  /**
   * Wird aufgerufen wenn eine Teilaufgabe erstellt werden soll.
   * Sind bereits Abgaben für das Übungsblatt hochgeladen worden,
   * werden diese zuerst gelöscht.
   */
  onAddTask(): void {
    if (this.sheet.submissions.length === 0) {
      this.addTask()
    } else if (window.confirm('Für das Arbeitsblatt wurden bereits Abgaben hochgeladen. Wenn Sie eine neue Teilaufgabe erstellen ' +
      'werden die Abgaben des Blattes gelöscht und müssen neu hochgeladen werden. ' +
      'Aufgabe wirklich erstellen?')) {
      this.sheetService.deleteSubmissions(this.sheet).subscribe(
        () => this.sheet.submissions = [],
        error => console.error( error ),
        () => this.addTask()
      )
    }
  }

  /**
   * Fügt der aktuell ausgewählten Aufgabe eine Teilaufgabe hinzu.
   */
  addTask(): void {
    this.loadingSheet = true;
    let index = this.sheet.exercises.findIndex(e => e._id === this.selectedExercise);

    const newTask = new Task();
    newTask.question = 'Neue Unteraufgabe';
    newTask.order = this.sheet.exercises[index].tasks.length;
    newTask.points = 0;

    this.taskService.addTasks(this.selectedExercise, [newTask])
      .subscribe(task => {
        const newSolution = new Solution();
        newSolution.type = 'none';
        newSolution.range = new SolutionRange(0, 0);
        newSolution.regex = '';
        newSolution.hint = '';
        this.solutionService.addSolution(task[0]._id, newSolution).subscribe(
          solution => {
            task[0].solution = solution[0];
            this.sheet.exercises[index].tasks.push(task[0]);
          },
          error => console.error( error ),
          () => {
            this.originalSheet = Object.assign({}, this.sheet);
            this.selectedExercise = null;
            this.selectedTask = task[0]._id;
            this.loadingSheet = false;
          });
      });
  }

  /**
   * Wird aufgerufen, wenn eine Teilaufgabe gelöscht werden soll.
   * Sind bereits Abgaben für das Übungsblatt hochgeladen worden,
   * werden diese zuerst gelöscht.
   * @param exercise
   * @param task
   */
  onDeleteTask(exercise: Exercise, task: Task) {
    if (this.sheet.submissions.length === 0) {
      this.deleteTask(exercise, task);
    } else if (window.confirm('Für das Arbeitsblatt wurden bereits Abgaben hochgeladen. Wenn Sie die Teilaufgabe löschen ' +
      'werden die Abgaben des Blattes gelöscht und müssen neu hochgeladen werden. ' +
      'Teilaufgabe wirklich löschen?')) {
      this.sheetService.deleteSubmissions(this.sheet).subscribe(
        () => this.sheet.submissions = [],
        error => console.error( error ),
        () => this.deleteTask(exercise, task)
      )
    }
  }

  /**
   * Löscht eine Teilaufgabe einer Aufgabe
   * @param exercise Aufgabe die die Teilaufgabe enthält
   * @param task Teilaufgabe, die gelöscht werden soll
   */
  deleteTask(exercise: Exercise,task: Task): void {
    if (exercise.tasks.length === 1) {
      if (window.confirm('Wenn Sie die Teilaufgabe löschen wird automatisch die zugehörige Aufgabe mitgelöscht.' +
        ' Wollen Sie die Teilaufgabe löschen?')) {
        this.selectedTask = null;
        this.deleteExercise(exercise);
      }
    } else {
      if (this.sheet.submissions.length > 0 || window.confirm('Wollen Sie die Teilaufgabe wirklich löschen?')) {
        this.loadingSheet = true;
        let eIndex = this.sheet.exercises.findIndex(e => e._id === exercise._id);
        let tIndex = this.sheet.exercises[eIndex].tasks.findIndex(t => t._id === task._id);
        this.sheet.exercises[eIndex].tasks.splice(tIndex, 1);
        this.exerciseService.updateExercise(exercise).subscribe(
          exercise => console.log(exercise),
          error => {
            console.error(error);
            this.sheet.exercises[eIndex].tasks.splice(tIndex, 0, task);
            this.loadingSheet = false;
          },
          () => {
            this.taskService.deleteTask(task).subscribe(
              task => console.log(task),
              error => console.error(error),
              () => {
                if (this.selectedTask === task._id) {
                  this.selectedTask = null;
                }
                this.originalSheet = Object.assign({}, this.sheet);
                this.loadingSheet = false
              }
            );
          }
        )
      }
    }
  }

  /**
   * Wird aufgerufen, wenn Informationen des Übungsblattes geändert wurden.
   * Schickt die Änderungen an den Server.
   */
  onSheetUpdate() {
    this.sheetService.updateSheet(this.sheet).subscribe(
      null,
      error => {
        console.log(error);
        this.sheet = Object.assign({}, this.originalSheet);
      },
      () => this.originalSheet = Object.assign({}, this.sheet)
    );
  }

  /**
   * Überprüft ob für das Übungsblatt bereits Abgaben hochgeladen wurden.
   * Wenn bereits Abgaben vorhanden sind, wird der User informiert und die erneute
   * Ausführung der Autokorrektur angeboten.
   */
  checkSubmissionCorrection(): void {
    if(this.sheet.submissions == null) return;
    if(this.sheet.submissions.length <= 0) return;

    if(!confirm("Sie haben ein Übungsblatt mit bestehenden Abgaben editiert. Autokorrektur neu ausführen?")) return;
    this.sheet.submissions.forEach(sub => this.sheetService.autocorrectSubmission(sub.toString()).subscribe())
    console.log("autocorrect")
  }

  /**
   * Berechnet aus den Teilaufgaben einer Aufgabe die
   * Gesamtpunktzahl der Aufagbe
   * @param exercise Aufgabe, für die Gesamtpunktzahl berechnet werden soll
   * @return number Gesamtpunktzahl der Aufgabe
   */
  calculatePoints(exercise: Exercise): number {
      let points = 0;
      exercise.tasks.forEach(task => points += task.points);
      return points;
  }

  /**
   * Navigiert den User zurück zur zuletzt besuchten Seite
   */
  goBack(): void {
    this.location.back();
  }
}
