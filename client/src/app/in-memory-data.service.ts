import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import {Course} from "./course";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const courses = [
      { id: 1,  name: 'EIMI', sheets: [
          {id: 1, name: 'HTML und CSS'},
          {id: 2, name: 'Visuelle Wahrnehmung, Farben'},
          {id: 3, name: 'Digitale Medien'},
          {id: 4, name: 'Usability'},
        ], faculty: 'Fakultät', semester: 'SS18', min_req_sheets: 2},
      { id: 2,  name: 'EIMI', sheets: [], faculty: 'Fakultät', semester: 'WS19/18', min_req_sheets: 2},
      { id: 3,  name: 'Propädeutikum', sheets: [], faculty: 'Fakultät', semester: 'SS18', min_req_sheets: 2},
    ];
    const sheets = [
      {id: 1, name: 'HTML und CSS', course_id: 1, submissions: [], submissiondate: '2018-10-22 23:59:00',exercises: [], min_reg_points: 50},
      {id: 2, name: 'Visuelle Wahrnehmung, Farben', course_id: 1, submissions: [], submissiondate: '2018-10-21 23:59:00',exercises: [], min_reg_points: 50},
      {id: 3, name: 'Digitale Medien', course_id: 1, submissions: [], submissiondate: '2018-10-20 23:59:00',exercises: [], min_reg_points: 50},
      {id: 4, name: 'Usability', course_id: 1, submissions: [], submissiondate: '2018-10-25 23:59:00',exercises: [], min_reg_points: 50}
    ];
    return {courses, sheets};
  }
}
