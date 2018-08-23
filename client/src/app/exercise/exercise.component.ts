import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-exercise',
	templateUrl: './exercise.component.html',
	styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

	selectedFile = null;
	dropzoneActive:boolean = false;

	onFilesAdded(fileList: FileList){
		console.log(fileList);
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

	constructor() { }

	ngOnInit() {

	}

}
