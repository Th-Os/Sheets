import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SheetService} from "../sheet.service";
import {Location} from "@angular/common";
import {Task} from '../models/task';
import {Submission} from "../models/submission";
import {Observable} from "rxjs";
import {Exercise} from "../models/exercise";
import {ExerciseService} from "../exercise.service";

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit {

  loadingSubmissions: boolean = false;
  loadingExercisesWithTasks: boolean = false;
  exercises: Exercise[];
  tasks: Task[];
  submissions: Submission[];
  selected_submission: string;
  selected_task: string;

  constructor(
    private route: ActivatedRoute,
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
      .subscribe( exercises =>  {
        this.exercises = exercises;
        this.getTasks();
      })
  }

  getTasks() {
    console.log('tasks');
    this.exercises.forEach( (exercise, index) => {
      this.exerciseService.getExerciseTasks(exercise._id).subscribe( tasks => {
        exercise['tasks'] = tasks;
        this.exercises[index] = exercise;
      });
    });
    if (this.selected_task === null) this.selected_task = this.exercises[0].tasks[0]._id;
    this.loadingExercisesWithTasks = false;
  }

  getSubmissions() {
    this.loadingSubmissions = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheetSubmissions(id).subscribe( submissions => {
      this.submissions = submissions;
      if (this.selected_submission === null) this.selected_submission = this.submissions[0]._id;
      this.loadingSubmissions = false;
    });
  }


  onSubmissionSelect(id): void {
    this.selected_submission = id;
  }

  exit (): void {
    this.location.go(`/sheets/${this.route.snapshot.paramMap.get('id')}`)
  }


}
