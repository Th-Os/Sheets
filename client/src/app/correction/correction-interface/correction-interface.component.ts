import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {SolutionService} from "../../services/solution.service";
import {AnswerService} from "../../services/answer.service";
import {Solution} from "../../models/solution";
import {TaskService} from "../../services/task.service";
import {Task} from '../../models/task';
import {Answer} from "../../models/answer";

@Component({
  selector: 'app-correction-interface',
  templateUrl: './correction-interface.component.html',
  styleUrls: ['./correction-interface.component.css']
})
export class CorrectionInterfaceComponent implements OnChanges, OnInit {

  @Input() task_id: string;
  @Input() submission_id: string;

  @Output() saved = new EventEmitter<boolean>();
  saving: boolean = false;

  loadingTask: boolean = false;
  task: Task;

  loadingAnswer: boolean = false;
  answer: Answer;

  loadingSolution: boolean = false;
  solution: Solution;
  points: number[];

  constructor(
    private taskService: TaskService,
    private solutionService: SolutionService,
    private answerService: AnswerService,
  ) { }

  ngOnInit() {
    this.getCorrection()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getCorrection()
  }

  saveAnswer() {
    this.saving = true;
    this.answerService.updateAnswer(this.answer).subscribe(
      null,
      null,
      () => {
        this.saved.emit(true);
        this.saving = false;
      }
    )
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
      () => {
        this.points = Array(this.task.points + 1).fill(0).map((x,i)=>i);
        this.loadingTask = false
      }
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
      answer => this.answer = answer,
      error => console.error( error ),
      () => this.loadingAnswer = false
    )
  }
}
