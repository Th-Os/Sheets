import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../course.service";
import {SheetService} from "../sheet.service";
import {Location} from "@angular/common";
import {Sheet} from "../sheet";
import {Submission} from "../submission";
import {SubmissionValidationResult} from "../submission-validation-result";
import {Student} from "../student";
import {Answer} from "../answer";
import * as JSZip from 'jszip';
//Achtung: Nach npm install muss im File "client/node_modules/jszip/lib/readable-stream-browser.js" die Zeile "module.exports = require("stream");" 
//durch "module.exports = require("readable-stream");" ersetzt werden!
import {MatSnackBar} from '@angular/material';
import {Inject} from '@angular/core'; 
import {DOCUMENT} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SubmissionUploadErrorDialogComponent} from "../submission-upload-error-dialog/submission-upload-error-dialog.component";

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})

export class SheetComponent implements OnInit {

  uploadErrorMsg = "Es kann nur eine aus GRIPS exportierte .zip-Datei verwendet werden";

  sheet: Sheet;
  selectedFile = null;

  submissionsAvaliable:boolean = false;
  submissionValidationResults: SubmissionValidationResult[];

  dropzoneActive:boolean = false;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) document,
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private location: Location
    ) {}

  ngOnInit() {
    this.getSheet();
  }

  displayMessage(text: string) {
    this.snackBar.open(text, "", {
      duration: 3000,
    });
  }

  getSheet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheet(id).subscribe(sheet => {
      this.sheet = sheet;
      this.updateUI;
      console.log("done fetching sheet");
    });
  }

  goBack(): void {
    this.location.back();
  }

  updateUI(): void {
    this.submissionsAvaliable = this.submissionsAvailable();
  }

  submissionsAvailable(): boolean {
    if(this.sheet == null) return false;
    if(this.sheet.submissions == null) return false;
    if(this.sheet.submissions.length <= 0) return false;
    return true;
  }

  onFilesAdded(fileList: FileList): void {
    if(fileList.length <= 0){
      this.displayMessage(this.uploadErrorMsg);
      return
    }

    if(fileList.length == 1 && this.isZip(fileList[0])){
      this.submissionValidationResults = [];
      this.readZipFolder(fileList[0]);
    }else{
      this.displayMessage(this.uploadErrorMsg);
    }
    
    (<HTMLInputElement>document.getElementById("fileToUpload")).value = "";
  }

  isZip(file): boolean {
    return file.type == "application/zip" || file.type =="application/octet-stream" || file.type =="application/x-zip-compressed" || file.type =="multipart/x-zip";
  }

  readZipFolder(file): void {
    let submissions = [];
    var reader = new FileReader();
    reader.onload = (e) => {
      var zip = new JSZip();
      zip.loadAsync(file).then((zip) => {
        let promises = [];
        Object.keys(zip.files).forEach((filename) => {
          if(filename.split("/").length < 3) return;
          if(!filename.endsWith("/")) {

            let submission = new Submission();
            let name = this.readAuthorName(filename);

            submission.author_name = name.split(" ")[0];
            submission.author_lastname = name.split(" ")[name.split(" ").length - 1];
            submissions.push(submission);

            if(filename.includes(".txt")){
              promises.push(zip.files[filename].async('string').then((fileData) => {

                let answers = this.readAnswers(fileData);
                let student_id = this.readStudentId(fileData);

                if(answers == null || student_id == null || student_id == NaN){
                  this.submissionValidationResults.push(new SubmissionValidationResult(filename));
                }else{
                  submission.answers = answers;
                  submission.student_id = student_id; 
                }
              }));
            }
          }
        })

        Promise.all(promises).then(() => {
          console.log("done reading zip");
          if(this.submissionValidationResults.length <= 0){
            this.sheet.submissions = submissions;
            this.updateUI();
            console.log("validation ok")
            console.log(this.sheet)
            this.uploadSubmissions();
          }else{
            this.displayValidationResults();
          }
        });
      })
    }

    reader.readAsArrayBuffer(file);
  }

  uploadSubmissions() {
    this.sheetService.updateSheet(this.sheet);
  }

  displayValidationResults() {
    this.dialog.open(SubmissionUploadErrorDialogComponent, {
      data: this.submissionValidationResults
    });
  }

  readStudentId(text: string): number {
    let lines = text.split("\n");

    if(lines.length > 0){
      return parseInt(lines[0]);
    }

    return NaN;
  }

  readAnswers(text: string): Answer[] {

/*
Außnahmen bei der Validierung:
- kein Leerzeichen nach "x)"
*/

let lines = text.split("\n");
let answers = [];
let regexTask = this.formatRegExp("Aufgabe\\\s\\\d+.\\\d+:");
let regexText = this.formatRegExp("[a-z]{1}\\\)\\\s?.*");

let taskNum = 1;
let subtaskNum = 0;

for (var i = 0; i < lines.length; ++i) {
  if(i == 0) continue;
  let line = lines[i];

  if(line.match(regexTask) != null) {
    taskNum = parseInt(line.match(this.formatRegExp("\\\d+.\\\d+"))[0].replace(".", ""));
    subtaskNum = 0;
    continue;
  }

  if(line.match(regexText) != null) {
    let answer = new Answer();
    answer.text = line.replace(this.formatRegExp("[a-z]{1}\\\)\\\s"), "");
    answer.task_id = parseInt(taskNum.toString() + subtaskNum.toString());
    answers.push(answer);
    subtaskNum++;
    continue
  }

  //Kriterien verletzt
  //console.log(line)
  //return null
}

return answers;
}

formatRegExp(str) {
  return new RegExp(str);
}

readAuthorName(fileName): string {
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

  clearSubmissions() {
    this.sheet.submissions = [];
    this.updateUI();
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
