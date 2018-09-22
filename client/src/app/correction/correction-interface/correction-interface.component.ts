import { Component, OnInit, Input } from '@angular/core';
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
export class CorrectionInterfaceComponent implements OnInit {

  @Input() set task_id(val: string) {
    console.log('previous task_id = ', this.task_id);
    console.log('currently selected task_id=', val);
    this.task_id = this.task;
    this._item.status = 'In Process';
  }
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
    this.getTask();
    this.getSolution()
  }

  getTask(): void {
    this.loadingTask = true;
    console.log(this.task_id)
    this.taskService.getTask(this.task_id).subscribe(
      task => this.task = task
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
