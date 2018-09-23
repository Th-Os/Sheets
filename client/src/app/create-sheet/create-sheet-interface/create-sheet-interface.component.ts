import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ExerciseService} from "../../services/exercise.service";
import {TaskService} from "../../services/task.service";
import {Exercise} from "../../models/exercise";
import {Task} from "../../models/task";

@Component({
  selector: 'app-create-sheet-interface',
  templateUrl: './create-sheet-interface.component.html',
  styleUrls: ['./create-sheet-interface.component.css']
})
export class CreateSheetInterfaceComponent implements OnChanges, OnInit {

  @Input() exercise_id: string;
  @Input() task_id: string;

  saving: boolean = false;
  loading: boolean = false;
  exercise: Exercise;
  task: Task;

  constructor(
    private exerciseService: ExerciseService,
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.reloadEdit();
  }

  ngOnChanges() {
    this.reloadEdit();
  }

  reloadEdit() {
    this.exercise = this.task = null;
    if (this.exercise_id !== null) this.getExercise();
    if(this.task_id !== null) this.getTask();
  }

  getExercise(): void {
    this.loading = true;
    this.exerciseService.getExercise(this.exercise_id).subscribe(
      exercise => this.exercise = exercise,
      error => console.error( error ),
      () => this.loading = false
    );
  }

  getTask(): void {
    this.loading = true;
    this.taskService.getTask(this.task_id).subscribe(
      task  => this.task = task,
      error => console.error( error ),
      () => this.loading = false,
    );
  }

  save() {
    if (this.task_id !== null) this.saveTask();
    if(this.exercise_id !== null) this.saveExercise();
  }

  saveTask() {
    this.saving = true;
    this.taskService.updateTask(this.task)
      .subscribe(
        null,
        error => console.error( error ),
        () => this.saving = false );
  }

  saveExercise() {
    this.saving = true;
    this.exerciseService.updateExercise(this.exercise)
      .subscribe(
        null,
        error => console.error( error ),
        () => this.saving = false)
  }

}
