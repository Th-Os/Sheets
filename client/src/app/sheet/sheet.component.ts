import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../course.service";
import {SheetService} from "../sheet.service";
import {Location} from "@angular/common";
import {Sheet} from "../sheet";
import * as JSZip from 'jszip';

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
    const id = +this.route.snapshot.paramMap.get('id');
    this.sheetService.getSheet(id);
  }

  goBack(): void {
    this.location.back();
  }

    onFilesAdded(fileList: FileList){
    if(fileList.length <= 0){
      console.log("Error reading files: List <= 0")
      return
    }

    if(fileList.length == 1 && (fileList[0].type == "application/zip" || fileList[0].type =="application/octet-stream" || fileList[0].type =="application/x-zip-compressed" || fileList[0].type =="multipart/x-zip")){
      this.addZipFolder(fileList[0]);
      return
    }

    //TODO: add functionality for multiple single files
    //this.addSingleFiles(fileList);
  }

  addSingleFiles(fileList){

  }

  addZipFolder(file){
    var reader = new FileReader();
    reader.onload = function (e) {
      var zip = new JSZip();
      zip.loadAsync(file).then(function (zip) {
        Object.keys(zip.files).forEach(function (filename) {

          console.log(filename)    


          //zip.files[filename].async('string').then(function (fileData) {
                //console.log(fileData) // These are your file contents  
            //})
        })
      })
    }

    reader.readAsArrayBuffer(file);
  }

  addFile(file){

  }

  handleFileSelection(event){
    this.onFilesAdded(event.target.files);
  }

  handleFileDrop(fileList: FileList) {
    this.onFilesAdded(fileList);
  }

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

}
