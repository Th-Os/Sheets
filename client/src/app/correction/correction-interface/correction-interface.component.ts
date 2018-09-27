import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {SolutionService} from "../../services/solution.service";
import {AnswerService} from "../../services/answer.service";
import {Solution} from "../../models/solution";
import {TaskService} from "../../services/task.service";
import {Task} from '../../models/task';
import {Answer} from "../../models/answer";
import {isArray} from "util";

@Component({
  selector: 'app-correction-interface',
  templateUrl: './correction-interface.component.html',
  styleUrls: ['./correction-interface.component.css']
})
export class CorrectionInterfaceComponent implements OnChanges, OnInit {

  @Input() task_id: string;
  @Input() submission_id: string;
  @Input() correctionMode: boolean;

  @Output() saved = new EventEmitter<boolean>();
  saving: boolean = false;

  loadingTask: boolean = false;
  task: Task;

  loadingAnswer: boolean = false;
  answer: Answer;

  loadingSolution: boolean = false;
  solution: Solution;

  constructor(
    private taskService: TaskService,
    private solutionService: SolutionService,
    private answerService: AnswerService,
  ) { }

  ngOnInit() {
    this.getCorrection()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (!changes.correctionMode) {
      if (this.correctionMode) this.saveAnswer();
      else this.getCorrection()
    }
  }

  saveAnswer() {
    if (this.answer) {
      this.saving = true;
      this.answerService.updateAnswer(this.answer).subscribe(
        null,
        null,
        () => {
          if (!this.correctionMode) this.saved.emit(true);
          else this.getCorrection();
          this.saving = false;
        }
      )
    }
  }

  getCorrection(): void {
    this.task = this.solution = this.answer =  null;
    this.getTask();
    this.getSolution();
    this.getAnswer();
  }

  getTask(): void {
    this.loadingTask = true;
    this.taskService.getTask(this.task_id).subscribe(
      task => this.task = task,
      error => console.error( error ),
      () => this.loadingTask = false
    );
  }

  getSolution(): void {
    this.loadingSolution = true;
    this.solutionService.getSolution(this.task_id).subscribe(
      solution => this.solution = solution,
      error => console.error( error ),
      () => this.loadingSolution = false
    )
  }

  getAnswer(): void {
    this.loadingAnswer = true;
    this.answerService.getAnswer(this.submission_id, this.task_id).subscribe(
      answer => { if (!isArray(answer)) this.answer = answer },
      error => console.error( error ),
      () => this.loadingAnswer = false
    )
  }
}
