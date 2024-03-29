import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SheetService} from "../services/sheet.service";
import {Submission} from "../models/submission";
import {Exercise} from "../models/exercise";
import {TaskService} from "../services/task.service";
import {Sheet} from "../models/sheet";
import {CorrectionInterfaceComponent} from "./correction-interface/correction-interface.component";
import {StudentService} from "../services/student.service";
import {Location} from "@angular/common";

enum KEY_CODE {
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  DOWN_ARROW = 40,
}

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit {

  @ViewChild(CorrectionInterfaceComponent)
  private correctionInterfaceComponent: CorrectionInterfaceComponent;

  correctionMode: boolean = false;

  loadingSheet: boolean = false;
  loadingSubmissions: boolean = false;
  loadingExercisesWithTasks: boolean = false;

  sheet: Sheet;
  exercises: Exercise[];
  submissions: Submission[];

  selected_submission: string = null;
  selected_task: string = null;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sheetService: SheetService,
    private studentService: StudentService,
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.getSheet();
    this.getExercisesWithTasks();
    this.getSubmissions();
  }

  @HostListener('window:keyup', ['$event']) keyEvent($event) {
    if ($event.keyCode === KEY_CODE.RIGHT_ARROW) this.navigateSubmissions(1);
    if ($event.keyCode === KEY_CODE.LEFT_ARROW) this.navigateSubmissions(-1);
    if ($event.keyCode === KEY_CODE.UP_ARROW) this.navigateTasks(-1);
    if ($event.keyCode === KEY_CODE.DOWN_ARROW) this.navigateTasks(1);
  }

  getSheet(): void {
    this.sheetService.getSheet(this.route.snapshot.paramMap.get('id')).subscribe(
      sheet => this.sheet = sheet,
      error => console.error( error ),
      () => this.loadingSheet = false
    )
  }

  getExercisesWithTasks() {
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheetExercises(id)
      .subscribe(
        exercises => this.exercises = exercises,
        error => console.error( error ),
        () => {
          this.exercises.forEach((exercise, index) => {
            if (exercise.tasks.length > 0) {
              this.taskService.getTasks(exercise._id).subscribe(
                tasks => exercise.tasks = tasks,
                error => console.error(error),
                () => {
                  if (index === 0 && this.selected_task === null) this.selected_task = exercise.tasks[0]._id;
                  this.exercises[index] = exercise
                  if (index === this.exercises.length) this.loadingExercisesWithTasks = false;
                }
              );
            }
          });
        });

  }

  getSubmissions() {
    this.loadingSubmissions = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheetSubmissions(id).subscribe(
      submissions => this.submissions = submissions,
      error => console.error( error ),
      () => {
        this.submissions.forEach((submission, index) => {
          this.studentService.getStudent(submission.student).subscribe(
            student => this.submissions[index].student = student,
            error => console.error( error ),
            () => {
              if (this.submissions.length -1 === index) {
                if (this.selected_submission === null && this.submissions.length > 0) this.selected_submission = this.submissions[0]._id;
                this.loadingSubmissions = false;
              }
            }
          )
        })
      });
  }

  navigateSubmissions(change: number): void {
    let currentIndex = this.submissions.findIndex(s => s._id === this.selected_submission);
    let nextIndex = currentIndex + change;
    if (nextIndex < 0) {
      this.selected_submission = this.submissions[this.submissions.length -1]._id;
      this.navigateTasks(-1);
    }else if (nextIndex > this.submissions.length -1) {
      this.selected_submission = this.submissions[0]._id;
      this.navigateTasks(1);
    } else {
      this.selected_submission = this.submissions[nextIndex]._id;
    }
  }

  navigateTasks(change: number) {
    let currentExIndex = this.exercises.findIndex(e => e.tasks.findIndex(t => t._id === this.selected_task) >= 0)
    let currentTaIndex = this.exercises[currentExIndex].tasks.findIndex(t => t._id === this.selected_task);
    let newTaIndex = currentTaIndex + change;
    if (newTaIndex < 0) {
      let newExIndex = currentExIndex - 1;
      if (newExIndex < 0) {
        let tasks = this.exercises[this.exercises.length - 1].tasks;
        this.selected_task = this.exercises[this.exercises.length - 1].tasks[tasks.length -1]._id;
        this.navigateSubmissions(-1)
      } else {
        this.selected_task = this.exercises[newExIndex].tasks[this.exercises[newExIndex].tasks.length -1]._id;
      }
    } else if (newTaIndex > this.exercises[currentExIndex].tasks.length -1) {
      let newExIndex = currentExIndex + 1;
      if (newExIndex > this.exercises.length - 1) {
        this.selected_task = this.exercises[0].tasks[0]._id;
        this.navigateSubmissions(1);
      } else {
        if (this.exercises[newExIndex].tasks.length > 0) this.selected_task = this.exercises[newExIndex].tasks[0]._id;
        else {
          while (newExIndex < this.exercises.length -1 ) {
            newExIndex = newExIndex + 1;
            if (this.exercises[newExIndex].tasks.length > 0) {
              this.selected_task = this.exercises[newExIndex].tasks[0]._id;
              return;
            }
          }
          this.selected_task = this.exercises[0].tasks[0]._id;
          this.navigateSubmissions(1);
        }
      }
    } else {
      this.selected_task = this.exercises[currentExIndex].tasks[newTaIndex]._id;
    }
  }

  goBack (): void {
    this.location.back();
  }


  onAnswerSaved(saved: boolean) {
    this.navigateTasks(1)
  }

}
