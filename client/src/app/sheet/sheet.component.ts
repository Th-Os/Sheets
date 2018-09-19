import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SheetService} from "../services/sheet.service";
import {CourseService} from '../services/course.service';
import {Location} from "@angular/common";
import {Sheet} from '../models/sheet';
import {Submission} from "../models/submission";
import {SubmissionValidationResult} from "../submission-validation-result";
import {Student} from "../models/student";
import {Answer} from "../models/answer";
import * as JSZip from 'jszip';
//Achtung: Nach npm install muss im File "client/node_modules/jszip/lib/readable-stream-browser.js" die Zeile "module.exports = require("stream");"
//durch "module.exports = require("readable-stream");" ersetzt werden!
import {MatSnackBar} from '@angular/material';
import {Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SubmissionUploadErrorDialogComponent} from "../submission-upload-error-dialog/submission-upload-error-dialog.component";
import {Template} from "../template";
import {TemplateTask} from "../template-task";


@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})

export class SheetComponent implements OnInit {

  uploadErrorMsg = "Es kann nur eine aus GRIPS exportierte .zip-Datei verwendet werden";
  noTemplateErrorMsg = "Dem Aufgabenblatt ist keine Abgabenvorlage hinterlegt. Abgaben können nicht geparst werden";


  sheet: Sheet;
  submissionTemplate: Template;
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
    this.getSubmissionTemplate();
  }

  displayMessage(text: string) {
    this.snackBar.open(text, "", {
      duration: 3000,
    });
  }

  getSheet(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheet(id).subscribe(sheet => {
      this.sheet = sheet;
      this.updateUI();
      console.log(this.sheet);
      console.log("done fetching sheet");
    });
  }

  getSubmissionTemplate() {

    let templateString = `<Matrikelnummer>
    Aufgabe 1.1:
    a) /.+/ # 2
    b) /.+/ # 2
    c) /.+/ # 2
    d) /.+/ # 2
    Aufgabe 1.2:
    a) /.*(bachelor).*/ # 1
    b) /.*(proceeding|tagung).*/ # 1
    c) /.*(workshop|tagung|proceeding).*/ # 1
    d) /.*(journal|zeitschrift).*/ # 1
    Aufgabe 1.3:
    a) /.*(sentiment).*/ # 2
    b) /.*((Ü|ü)berblick).*/ # 2
    c) /.*(twitter).*/ # 2
    d) /.*(speziell).*/ # 2
    e) /.*(sentiment|twitter).*/ # 2
    f) /.*(Sentiment Analysis: A Perspective on its Past, Present and Future).*/ # 3
    Aufgabe 1.4:
    a) /.*(behavioral).*/ # 1
    b) /.+/ # 2
    c) /.*(tagung|hohe qualität).*/ # 2
    d) /.*(folgt nicht|teilweise).*/ # 2
    Aufgabe 1.5:
    a) /.*(gemessen).*/ # 1
    b) /.*(wiederhol|genauigkeit|verlässlichkeit).*/ # 1
    c) /.+/ # 1
    d) /.+/ # 1
    e) /.*(Hypothes|Forschung|Abstract|Zusammenfassung|Ausblick|Grenzen|Limitations).*/ # 1
    Aufgabe 1.6:
    a) /.*(lehr).*/ # 2
    b) /.*(phil).*/ # 2`;



    /*const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSubmissionTemplate(id).subscribe(template =>{
      console.log(template)
      });
      */

      this.submissionTemplate = this.parseTemplate(templateString);

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
        return;
      }

      if(this.submissionTemplate == null){
        this.displayMessage(this.noTemplateErrorMsg);
        return;
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
              let student = new Student();
              let name = this.readAuthorName(filename);

              student.name = name.split(" ")[0];
              student.lastname = name.split(" ")[name.split(" ").length - 1];
              submission.student = student;
              submissions.push(submission);

              if(filename.includes(".txt")){
                promises.push(zip.files[filename].async('string').then((fileData) => {

                  let validationResult = this.readAnswers(fileData);

                  let answers = validationResult.answers;
                  let student_id = this.readStudentId(fileData);

                  if(answers == null || student_id == null || student_id == NaN){
                    validationResult.filename = filename;
                    this.submissionValidationResults.push(validationResult);
                  }else{
                    submission.answers = answers;
                    submission.student.mat_nr = student_id;
                  }
                }));
              }
            }
          });

          Promise.all(promises).then(() => {
            console.log("done reading zip");
            if(this.submissionValidationResults.length <= 0){
              this.sheet.submissions = submissions;
              this.updateUI();
              console.log("validation ok")
              this.uploadAndCorrectSubmissions();
            }else{
              this.displayValidationResults();
            }
          });
        });
      };

      reader.readAsArrayBuffer(file);
    }

    uploadAndCorrectSubmissions() {
    //this.sheetService.updateSubmissions(this.sheet)
    //.subscribe(res =>
    //console.log(res)
    //this.sheet.submissions.forEach((submission) => {
    //this.sheetService.autocorrectSubmission(submission);
    //})
    //);
  }

  displayValidationResults() {
    this.dialog.open(SubmissionUploadErrorDialogComponent, {
      data: this.submissionValidationResults
    });
  }

  readStudentId(text: string): number {
    let lines = text.split("\n");

    if (lines.length > 0){
      return parseInt(lines[0]);
    }

    return NaN;
  }

  parseTemplate(text: string): Template {
    let result = new Template();

    let regexTask = this.formatRegExp("Aufgabe\\\s\\\d+.\\\d+:");
    let regexText = this.formatRegExp("[a-z]{1}\\\)\\\s?");

    let linesTemplate = text.split("\n");
    let task: TemplateTask = null;

    for (var i = 0; i < linesTemplate.length; ++i) {
      if(i == 0) continue; //Matrikelnummer

      let line = linesTemplate[i];

      if(line.match(regexTask) != null) {
        let taskNum = line.match(this.formatRegExp("\\\d+.\\\d+"))[0];
        task = new TemplateTask(taskNum);
        result.tasks.push(task);
        continue;
      }

      if(line.match(regexText) != null) {
        task.subtasks++;
        continue
      }

      //Kriterien verletzt
      console.log("Error parsing Template at line: " + i + " --> " + line)
    }

    console.log(result)
    return result;
  }

  readAnswers(text: string): SubmissionValidationResult {
    let answers = [];
    let template = this.submissionTemplate;

    for (var i = 0; i < template.tasks.length; ++i) {
      let task: TemplateTask = template.tasks[i];
      let nextTask: TemplateTask = null;

      let tagTaskStart = "Aufgabe " + task.name;
      let tagTaskEnd = "";

      if(i < template.tasks.length -1){
        nextTask = template.tasks[i + 1];
        tagTaskEnd = "Aufgabe " + nextTask.name;
      }

      console.log(text)
      
      if(text.includes(tagTaskStart)) {
        let textTask = "";

        if(tagTaskEnd == ""){
          textTask = text.slice(text.search(tagTaskStart));
        }else{
          textTask = text.slice(text.search(tagTaskStart), text.search(tagTaskEnd));
        }

        for (var j = 0; j < task.subtasks; ++j) {
          let tagSubTaskStart = String.fromCharCode(j + 97);
          let tagSubTaskEnd = String.fromCharCode(j + 98);

          if(textTask.match(new RegExp(tagSubTaskStart + "\\\)")) != null){
            let textSubTask = textTask.slice(textTask.search(new RegExp(tagSubTaskStart + "\\\)")), textTask.search(new RegExp(tagSubTaskEnd + "\\\)")));

            let answer = new Answer();
            let answerTextWOIndicator = textSubTask.replace(this.formatRegExp("[a-z]{1}\\\)"), "");
            let answerTextWOLineBreak = answerTextWOIndicator.replace(this.formatRegExp("\n"), "");
            let answerTextWOLeadingSpace = answerTextWOLineBreak.replace(this.formatRegExp(" "), "");
            answer.text = answerTextWOLeadingSpace;
            answer.task_id = parseInt(task.num.toString() + j.toString()); 
            answers.push(answer);
          }else{
            //Kriterien verletzt
            //console.log("Validation Error at: " + tagTaskStart + " " + tagSubTaskStart)
            let res = new SubmissionValidationResult();
            res.errorTaskNum = parseInt(task.num.toString() + j.toString());
            return res;
          }
        }
      }else{
              //Kriterien verletzt
              //console.log("Validation Error at: " + tagTaskStart)
              let res = new SubmissionValidationResult();
              res.errorTaskNum = task.num;
              return res;
            }
          }

          let res = new SubmissionValidationResult();
          res.answers = answers;
          console.log(answers)
          return res;
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
    this.sheetService.deleteSubmissions(this.sheet).subscribe((res) => console.log(res))
    //this.sheet.submissions = [];
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
