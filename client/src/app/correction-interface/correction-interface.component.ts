import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-correction-interface',
  templateUrl: './correction-interface.component.html',
  styleUrls: ['./correction-interface.component.css']
})
export class CorrectionInterfaceComponent implements OnInit {

  @Input() task_id: string;
  @Input() submission_id: string;

  constructor(

  ) { }

  ngOnInit() {
  }

}
