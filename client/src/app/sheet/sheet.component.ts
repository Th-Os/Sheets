import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SheetService} from "../services/sheet.service";
import {TaskService} from "../services/task.service";
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
import {MatDialog} from '@angular/material';
import {SubmissionUploadErrorDialogComponent} from "../submission-upload-error-dialog/submission-upload-error-dialog.component";
import {Exercise} from "../models/exercise";
import {Task} from "../models/task";
import {Template} from "../template";
import {TemplateTask} from "../template-task";
import {StudentService} from "../services/student.service";
import {AssignSubmissionDialogComponent} from '../assign-submission-dialog/assign-submission-dialog.component';


@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})

export class SheetComponent implements OnInit {

  uploadErrorMsg = "Es kann nur eine aus GRIPS exportierte .zip-Datei verwendet werden";
  noTemplateErrorMsg = "Dem Aufgabenblatt ist keine Vorlage hinterlegt. Abgaben können nicht validiert werden";


  submissionTemplate: Template;
  selectedFile = null;

  submissionValidationResults: SubmissionValidationResult[];

  dropzoneActive:boolean = false;
  loadInProgress:boolean = false;

  loadingSheet: boolean = false;
  sheet: Sheet;

  loadingSubmissions: boolean = false;
  progressText: string = ""

  loadingExercisesWithTasks: boolean = false;
  exercises: Exercise[];

  loggInUserRole: string;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) document,
    private route: ActivatedRoute,
    private sheetService: SheetService,
    private taskService: TaskService,
    private studentService: StudentService,
    private location: Location
    ) {}

  ngOnInit() {
    this.getSheetWithSubmissions();
    this.getExercisesWithTasks();
    this.getSubmissionTemplate();

    this.loggInUserRole = JSON.parse(localStorage.getItem('currentUser')).role.name;
  }

  getExercisesWithTasks() {
    this.loadingExercisesWithTasks = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheetExercises(id)
    .subscribe(
      exercises => this.exercises = exercises,
      error => console.error( error ),
      () => {
        this.exercises.forEach((exercise, index) => {
          if (exercise.tasks.length > 0) {
            this.taskService.getTasks(exercise._id).subscribe(
              tasks => exercise.tasks = tasks,
              error => console.error(error),
              () => {
                this.exercises[index] = exercise;
                if (index === this.exercises.length -1) this.loadingExercisesWithTasks = false;
              });
          }
        });
      }
      );
  }

  getExercisePoints(exercise: Exercise): number {
    let points = 0;
    exercise.tasks.forEach( t => points += t.points);
    return points;
  }

  getTaskObjects(){
    this.sheet.exercises = []

    this.sheetService.getSheetExercises(this.route.snapshot.paramMap.get('id'))
    .subscribe( exercises => {
      exercises.forEach(ex =>{
        let sheetExercise: Exercise = new Exercise();
        sheetExercise._id = ex._id;
        sheetExercise.description = ex.description;
        sheetExercise.name = ex.name;
        sheetExercise.order = ex.order;
        sheetExercise.tasks = []
        this.sheet.exercises.push(sheetExercise);

        ex.tasks.forEach(task => {
          this.taskService.getTask(task).subscribe(t => {
            sheetExercise.tasks.push(t)
          })
        })
      })
    })
    .add( () => {
      this.loadingExercisesWithTasks = false;
    })
  }

  displayMessage(text: string) {
    this.snackBar.open(text, "", {
      duration: 3000,
    });
  }

  getSheetWithSubmissions() {
    this.loadingSheet = this.loadingSubmissions = true;
    const id = this.route.snapshot.paramMap.get('id');

    this.sheetService.getSheet(id).subscribe(
      sheet => this.sheet = sheet,
      error => console.error( error ),
      () => {
        this.loadingSheet = false;
        this.getTaskObjects();
        this.sheetService.getSheetSubmissions(id).subscribe(
          submissions => this.sheet.submissions = submissions,
          error => {
            console.error( error )
            this.loadingSubmissions = false;
          },
          () => {
            if(this.sheet.submissions == null  || this.sheet.submissions.length <= 0) this.loadingSubmissions = false;
            this.sheet.submissions.forEach((submission, index) => {
              this.studentService.getStudent(submission.student).subscribe(
                student => this.sheet.submissions[index].student = student,
                error => console.error( error ),
                () => {
                  if (index === this.sheet.submissions.length - 1) this.loadingSubmissions = false;
                }
                )
            })
          });
      }
      )
  }

  getSubmissionTemplate() {
    const id = this.route.snapshot.paramMap.get('id');
    //this.submissionTemplate = this.testTemplate();
    this.sheetService.getSubmissionTemplate(id).subscribe(template =>{
      //console.log(template)
      this.submissionTemplate = this.parseTemplate(template);
    });
  }

  goBack(): void {
    this.location.back();
  }

  onFilesAdded(fileList: FileList): void {
    if(fileList.length <= 0){
      this.displayMessage(this.uploadErrorMsg);
      this.clearInput()
      return;
    }

    if(this.submissionTemplate == null){
      this.displayMessage(this.noTemplateErrorMsg);
      this.clearInput();
      return;
    }

    if(fileList.length == 1 && this.isZip(fileList[0])){

      var proceed = true;

      if(this.sheet.submissions.length > 0){
        proceed = confirm("Bestehende Abgaben werden ersetzt. Mit Upload fortfahren?");
        if(!proceed){
          this.clearInput();
          return;
        }

        this.sheetService.deleteSubmissions(this.sheet).subscribe((res) => {
          this.submissionValidationResults = [];
          this.readZipFolder(fileList[0]);
        });
      }else{
        this.submissionValidationResults = [];
        this.readZipFolder(fileList[0]);
      }

    }else{
      this.displayMessage(this.uploadErrorMsg);
    }
  }

  isZip(file): boolean {
    return file.type == "application/zip" || file.type =="application/octet-stream" || file.type =="application/x-zip-compressed" || file.type =="multipart/x-zip";
  }

  clearInput() {
    (<HTMLInputElement>document.getElementById("fileToUpload")).value = "";
  }

  readZipFolder(file): void {
    let fileToLoad = file;
    this.clearInput();
    let submissions = [];
    var reader = new FileReader();
    reader.onload = (e) => {
      var zip = new JSZip();
      zip.loadAsync(fileToLoad).then((zip) => {
        let promises = [];
        Object.keys(zip.files).forEach((filename) => {
          if(filename.split("/").length < 3) return;
          if(!filename.endsWith("/")) {

            let submission = new Submission();
            let student = new Student();
            let name = this.readAuthorName(filename);
            let gripsID = this.readGripsID(filename);

            student.name = name.split(" ")[0];
            student.lastname = name.split(" ")[name.split(" ").length - 1];
            submission.student = student;
            submission.grips_id = gripsID;

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
                  submissions.push(submission);
                }
              }));
            }
          }
        });

        Promise.all(promises).then(() => {
          if(this.submissionValidationResults.length <= 0){ //TODO: 0 for release, 100 for test!
            this.loadInProgress = true;
            this.progressText = "organisiere Studenten..."

            let index = 0;
            let maxIndex = submissions.length;

            for (var i = 0; i < submissions.length; ++i) {
              let sub = submissions[i];
              this.studentService.getStudentById(sub.student.mat_nr).subscribe(res => {
                index++;
                if(res != null){
                  submissions[i].student = res;
                }

                if(index >= maxIndex){
                  //console.log("done reading zip");
                  //console.log("validation ok");
                  //console.log("uploading with data: ");
                  this.sheet.submissions = submissions;
                  //console.log(this.sheet)
                  this.uploadAndCorrectSubmissions();
                }
              })
            }
          }else{
            this.displayValidationResults();
          }
        });
      });
    };

    reader.readAsArrayBuffer(fileToLoad);
  }

  uploadAndCorrectSubmissions() {
    this.progressText = "sende Abgaben..."
    this.sheetService.uploadSubmissions(this.sheet)
    .subscribe(res => {

      res.submissions.forEach(newSubmission => {
        this.sheetService.autocorrectSubmission(newSubmission.toString()).subscribe()

      })

      this.loadInProgress = false;
      this.displayMessage("Abgaben erfolgreich hochgeladen")

      /*
      let tempSheet = null;
      this.sheetService.getSheet(this.sheet._id.toString()).subscribe(sheet => {
        tempSheet = sheet;
        res.submissions.map(sub => tempSheet.submissions.push(sub._id))
        this.sheetService.updateSheet(tempSheet).subscribe(res => {
          res.submissions.forEach(newSubmission => {
            this.sheetService.autocorrectSubmission(newSubmission.toString()).subscribe()
          })
          this.loadInProgress = false;
          this.displayMessage("Abgaben erfolgreich hochgeladen")
        })
      });
      */
    }
    );
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

  readGripsID(fileName: string){
    let res = null;
    let pathSlices = fileName.split("/");

    if(pathSlices.length < 2) return null;

    //"Vorname0 Nachname0_1327627_assignsubmission_file_"
    let relevantFolderName: string = pathSlices[pathSlices.length - 2];
    res = relevantFolderName.split("_")[1];
    return parseInt(res).toString();
  }

  autocorrect(){
    this.sheet.submissions.forEach(sub => this.sheetService.autocorrectSubmission(sub._id).subscribe(res => console.log(res)))
    console.log("autocorrect")
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
      if(line != ""){
        console.log("Error parsing Template at line: " + i + " --> " + line)
        return null;      
      }
    }

    //console.log(result)
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

      //console.log(text)

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

            if(answerTextWOLeadingSpace == ""){
              answerTextWOLeadingSpace += "-"
            }

            answer.text = answerTextWOLeadingSpace;
            answer.task_id = parseInt(task.num.toString() + j.toString());
            answer.task = this.findTask(answer);
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
    //console.log(answers)
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

  findTask(answer: Answer): Task {
    for (var i = 0; i < this.sheet.exercises.length; ++i) {
      let exercise = this.sheet.exercises[i];

      for (var j = 0; j < exercise.tasks.length; ++j) {
        let task = exercise.tasks[j];
        let taskIDArray = this.numberToArray(answer.task_id);

        if(taskIDArray[1] - 1 == exercise.order && taskIDArray[2] == task.order) {
          return task;
        }
      }
    }

    return null;
  }

  clearSubmissions() {
    if (window.confirm('Wollen Sie die Abgaben wirklich löschen?')) {
      this.sheetService.deleteSubmissions(this.sheet).subscribe((res) => {
        this.getSheetWithSubmissions();
      });
    }
  }

  numberToArray(number: number){
    let res = []
    let num = number.toString()
    for (var i = 0, len = num.length; i < len; i += 1) {
      res.push(parseInt(num.charAt(i)));
    }
    return res
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

  testTemplate(): Template{
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
    return this.parseTemplate(templateString);
  }

  downloadSheetPDF(): void {
    this.sheetService.downloadSheetPDF(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        let blob = new Blob([data], { type: 'application/pdf' });
        let url= window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => console.error( error ),
      () => console.log('file downloaded')
      )
  }

    downloadSheetCSV(): void {
    this.sheetService.downloadSheetCSV(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        let blob = new Blob([data], { type: 'application/csv' });
        let url= window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => console.error( error ),
      () => console.log('file downloaded')
      )
  }

    downloadSheetDOCX(): void {
    this.sheetService.downloadSheetDOCX(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        let blob = new Blob([data], { type: 'application/docx' });
        let url= window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => console.error( error ),
      () => console.log('file downloaded')
      )
  }

  assignSubmissions(): void {
    const notAlreadyAssigned = [];
    this.sheet.submissions.forEach(submission => {
      if (!submission.user) {
        notAlreadyAssigned.push(submission);
      }
    });
    const dialogRef = this.dialog.open(AssignSubmissionDialogComponent, {
      width: '500px',
      height: '80vh',
      data: { submissions: notAlreadyAssigned}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      } else {
        result.forEach(submission => {
          const submissionIndex = this.sheet.submissions.findIndex(s => s._id === submission._id);
          // Update submission
          this.sheet.submissions[submissionIndex] = submission;
        });
      }
    });
  }
}
