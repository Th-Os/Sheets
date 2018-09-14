import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../services/course.service";
import {SheetService} from "../services/sheet.service";
import {Location} from "@angular/common";
import {Sheet} from "../classes/sheet";
import {Submission} from "../classes/submission";
import {Student} from "../classes/student";
import {Answer} from "../answer";
import * as JSZip from 'jszip';
//Achtung: Nach npm install muss im File "client/node_modules/jszip/lib/readable-stream-browser.js" die Zeile "module.exports = require("stream");"
//durch "module.exports = require("readable-stream");" ersetzt werden!

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {

  sheet: Sheet;

  selectedFile = null;
  dropzoneActive:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getSheet();
  }

  getSheet(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheet(id);
    //TODO
    //this.sheet = new Sheet();
    this.sheet.submissions = [];
  }

  goBack(): void {
    this.location.back();
  }

  onFilesAdded(fileList: FileList): void {
    if(fileList.length <= 0){
      console.log("Error reading files: List <= 0")
      return;
    }

    if(fileList.length == 1 && (fileList[0].type == "application/zip" || fileList[0].type =="application/octet-stream" || fileList[0].type =="application/x-zip-compressed" || fileList[0].type =="multipart/x-zip")){
      this.addZipFolder(fileList[0]);
      return
    }
    //TODO: add functionality for multiple files
  }

  addZipFolder(file): void {
    var reader = new FileReader();
    reader.onload = (e) => {
      var zip = new JSZip();
      zip.loadAsync(file).then((zip) => {
        let counter: number = 0;
        Object.keys(zip.files).forEach((filename) => {
          if(filename.split("/").length < 3) return;
          if(!filename.includes(".txt")) {
            counter++;
            let submission = new Submission();
            let student = new Student();

            student.name = this.getStudentName(filename);
            student.id = counter;
            submission.id = counter;
            submission.student_id = student.id;
            submission.name = student.name;

            this.sheet.submissions.push(submission);
          }


          zip.files[filename].async('string').then((fileData) => {
                //student.id = getStudentId(filename);
                let answer = new Answer();
                //answer.text = getAnswerText(fileData);
                //console.log(fileData)
              })
        })
      })
    }

    reader.readAsArrayBuffer(file);
  }

  getStudentName(fileName): string {
    let res = null;
    let pathSlices = fileName.split("/");

    if(pathSlices.length < 2) return null;

    //"Vorname0 Nachname0_1327627_assignsubmission_file_"
    let relevantFolderName: string = pathSlices[pathSlices.length - 2];
    res = relevantFolderName.split("_")[0];
    return res;
  }

  addFile(file): void {

  }

  handleFileSelection(event): void {
    this.onFilesAdded(event.target.files);
  }

  handleFileDrop(fileList: FileList): void {
    this.onFilesAdded(fileList);
  }

  dropzoneState($event: boolean): void {
    this.dropzoneActive = $event;
  }
}
