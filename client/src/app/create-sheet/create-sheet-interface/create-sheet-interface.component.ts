import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ExerciseService } from "../../services/exercise.service";
import { TaskService } from "../../services/task.service";
import { Exercise } from "../../models/exercise";
import { Task } from "../../models/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ValidateRegex } from "../../validators/regex.validator";
import {SolutionService} from "../../services/solution.service";

@Component({
  selector: 'app-create-sheet-interface',
  templateUrl: './create-sheet-interface.component.html',
  styleUrls: ['./create-sheet-interface.component.css']
})

export class CreateSheetInterfaceComponent implements OnChanges, OnInit {

  @Input() exercise_id: string;
  @Input() task_id: string;

  @Output() taskUpdate = new EventEmitter<Task>();
  @Output() exerciseUpdate = new EventEmitter<Exercise>();

  saving: boolean = false;
  loading: boolean = false;
  exercise: Exercise;
  task: Task;

  regex = new FormControl('', [Validators.required, ValidateRegex]);
  choice: string = '';

  constructor(
    private exerciseService: ExerciseService,
    private taskService: TaskService,
    private solutionService: SolutionService,
  ) { }

  ngOnInit() {
    this.reloadEdit();
  }

  ngOnChanges() {
    this.reloadEdit();
  }

  getRegexErrorMessage() {
    return this.regex.hasError('required') ? 'Bitte Regex eingeben.' :
      this.regex.hasError('validRegex') ? 'Invalider Regex!' : '';
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
      task  => {
            this.task = task;
            this.solutionService.getSolution(task._id.toString()).subscribe(solution => {
            this.regex.setValue(task.solution.regex);

              this.task.solution = solution[0]});
          },
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
    this.solutionService.updateSolution(this.task.solution)
      .subscribe(
        null,
        error => console.error( error ),
        () => {
          this.taskService.updateTask(this.task).subscribe(
            null,
            error => console.error( error ),
            () => {
              this.taskUpdate.emit(this.task);
              this.saving = false
            }
          )
        }
      )
  }

  saveExercise() {
    this.saving = true;
    this.exerciseService.updateExercise(this.exercise)
      .subscribe(
        exercise => this.exercise = exercise,
        error => console.error( error ),
        () => {
          this.exerciseUpdate.emit(this.exercise);
          this.saving = false
        })
  }


  onAddChoice() {
    if (this.choice.length > 0) {
      this.task.choices.push(this.choice);
      this.choice = '';
    }
  }

  onRemoveChoice(index: number) {
    this.task.choices.splice(index, 1);
  }
}
