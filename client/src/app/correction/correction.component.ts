import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SheetService} from "../services/sheet.service";
import {Location} from "@angular/common";
import {Task} from '../models/task';
import {Submission} from "../models/submission";
import {Observable} from "rxjs";
import {Exercise} from "../models/exercise";
import {ExerciseService} from "../exercise.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit {

  loadingSubmissions: boolean = false;
  loadingExercisesWithTasks: boolean = false;
  exercises: Exercise[];
  tasks: Task[] = [];
  submissions: Submission[];
  selected_submission: string;
  selected_task: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sheetService: SheetService,
    private exerciseService: ExerciseService,
    private location: Location) { }

  ngOnInit() {
    this.selected_task = this.route.snapshot.paramMap.get('task_id');
    this.selected_submission = this.route.snapshot.paramMap.get('submission_id');
    console.log(this.selected_task);
    console.log(this.selected_submission);
    this.getExercisesWithTasks();
    this.getSubmissions();
  }

  getExercisesWithTasks() {
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheetExercises(this.route.snapshot.paramMap.get('id'))
      .subscribe( exercises => this.exercises = exercises)
      .add( () => {
        this.loadingExercisesWithTasks = false;
        if (this.selected_task === null) this.selected_task = this.exercises[0].tasks[0]._id
      })
  }

  getSubmissions() {
    this.loadingSubmissions = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheetSubmissions(id).subscribe( submissions => {
      this.submissions = submissions;
    }).add( () => {
      if (this.selected_submission === null) this.selected_submission = this.submissions[0]._id;
      this.loadingSubmissions = false;
    });
  }

  navigateSubmissions(change: number): void {
    let currentIndex = this.submissions.findIndex(s => s._id === this.selected_submission);
    let nextIndex = currentIndex + change;
    if (nextIndex < 0) {
      this.selected_submission = this.submissions[this.submissions.length -1]._id;
    }else if (nextIndex > this.submissions.length -1) {
      this.selected_submission = this.submissions[0]._id
    } else {
      this.selected_submission = this.submissions[nextIndex]._id;
    }
  }

  navigateTasks(change: number) {
    let currentExIndex = this.exercises.findIndex(e => e.tasks.findIndex(t => t._id === this.selected_task) >= 0)
    let currentTaIndex = this.exercises[currentExIndex].tasks.findIndex(t => t._id === this.selected_task);
    let newTaIndex = currentTaIndex + change;
    if (newTaIndex < 0) {
      let newExIndex = currentExIndex--;
      if (newExIndex < 0) {
        let tasks = this.exercises[this.exercises.length - 1].tasks;
        this.selected_task = this.exercises[this.exercises.length - 1].tasks[tasks.length -1]._id;
      } else {
        this.selected_task = this.exercises[newExIndex].tasks[this.exercises[newExIndex].tasks.length -1]._id;
      }
    } else if (newTaIndex >this.exercises[currentExIndex].tasks.length -1) {
      let newExIndex = currentExIndex++;
      if (newExIndex > this.exercises.length - 1) {
        this.selected_task = this.exercises[0].tasks[0]._id;
      } else {
        this.selected_task = this.exercises[newExIndex].tasks[0]._id;
      }
    }
  }

  exit (): void {
    this.router.navigate([`/sheets/${this.route.snapshot.paramMap.get('id')}`])
  }


}
