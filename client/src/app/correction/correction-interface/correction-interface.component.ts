import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {SolutionService} from "../../services/solution.service";
import {AnswerService} from "../../services/answer.service";
import {Solution} from "../../models/solution";
import {TaskService} from "../../services/task.service";
import {Task} from '../../models/task';

@Component({
  selector: 'app-correction-interface',
  templateUrl: './correction-interface.component.html',
  styleUrls: ['./correction-interface.component.css']
})
export class CorrectionInterfaceComponent implements OnChanges, OnInit {

  @Input() task_id: string;
  @Input() submission_id: string;

  loadingTask: boolean = false;
  task: Task;

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
    this.getCorrection()
  }

  getCorrection(): void {
    this.task = this.solution = null;
    this.getTask();
    this.getSolution();
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

}
