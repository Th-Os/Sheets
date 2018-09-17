import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SheetService} from "../sheet.service";
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
  //submissions: Submission[];
  submissions = [
    {_id:"5b817898dd86994c7802e0d6"},
    {_id:"5b9e6848f4c9492dd4e60daa"},
    {_id:"5b9e6848f4c9492dd4e60dab"},
    {_id:"5b9e6a51f4c9492dd4e60dac"},
    {_id:"5b9e6a51f4c9492dd4e60dad"},
    {_id:"5b9e6a51f4c9492dd4e60dae"},
    {_id:"5b9e6a51f4c9492dd4e60daf"},
    {_id:"5b9e6a51f4c9492dd4e60db2"},
    {_id:"5b9e6a51f4c9492dd4e60db3"},
    {_id:"5b9e6a51f4c9492dd4e60db6"},
    {_id:"5b9e6a51f4c9492dd4e60db7"},
    {_id:"5b9e6a51f4c9492dd4e60db0"},
    {_id:"5b9e6a51f4c9492dd4e60db1"},
    {_id:"5b9e6a51f4c9492dd4e60db4"},];
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
      .pipe(
        tap( exercises => this.exercises = exercises),
        tap( () => {
          console.log(this.exercises)
          if(this.selected_task == null) this.selected_task = this.exercises[0].tasks[0]._id;
        }),
      )
      /*
      .subscribe( exercises =>  {
        this.exercises = exercises;
      }).add( () => {
        if(this.selected_task == null) this.selected_task = this.exercises[0].tasks[0]._id;
    });*/
  }

  getTasks() {
    this.exercises.forEach( (exercise, index) => {
      if (exercise.tasks.length > 0) {
        this.exerciseService.getExerciseTasks(exercise._id).subscribe(tasks => {
          exercise.tasks = tasks;
          this.exercises[index] = exercise;
        }).add(() => {
          if(index === this.exercises.length -1) this.finishTasks();
        });
      } else if (index === this.exercises.length -1) this.finishTasks();
    });
  }

  finishTasks() {
    if (this.selected_task == null) {
      console.log(this.exercises[0]);
      console.log(this.exercises[0].tasks)
      console.log(this.exercises[0].tasks[0]);
      this.selected_task = this.exercises[0].tasks[0]._id;
    }
    console.log(this.selected_task)
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
    if (this.selected_submission == null) this.selected_submission = this.submissions[0]._id;
  }


  onSubmissionSelect(id): void {
    this.selected_submission = id;
  }

  nextSubmission() {
    console.log('next')
    let currentIndex = this.submissions.findIndex(e => e._id === this.selected_submission);
    let params = {};
    if (currentIndex === this.submissions.length - 1) {
      let params = { task_id: this.selected_task, submission_id: this.submissions[0]._id };
    } else {
      let params = { task_id: this.selected_task, submission_id: this.submissions[currentIndex + 1]._id };
    }
    this.router.navigate(['/sheets/' + this.route.snapshot.paramMap.get('id') + '/correction', params]);
  }


  exit (): void {
    this.router.navigate([`/sheets/${this.route.snapshot.paramMap.get('id')}`])
  }


}
