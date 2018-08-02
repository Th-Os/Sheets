import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const courses = [
      { id: 1,  name: 'EIMI', sheets: [], faculty: 'Fakultät', semester: 'SS18', min_req_sheets: 2},
      { id: 2,  name: 'EIMI', sheets: [], faculty: 'Fakultät', semester: 'WS19/18', min_req_sheets: 2},
      { id: 3,  name: 'Propädeutikum', sheets: [], faculty: 'Fakultät', semester: 'SS18', min_req_sheets: 2},
    ];
    return {courses};
  }
}
