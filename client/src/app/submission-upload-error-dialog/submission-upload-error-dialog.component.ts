import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SubmissionErrorDialogData} from "../submission-error-dialog-data";
import {SubmissionValidationResult} from "../submission-validation-result";

@Component({
	selector: 'app-submission-upload-error-dialog',
	templateUrl: './submission-upload-error-dialog.component.html',
	styleUrls: ['./submission-upload-error-dialog.component.css']
})
export class SubmissionUploadErrorDialogComponent implements OnInit {

	results = null

	constructor(
		public dialog: MatDialogRef<SubmissionUploadErrorDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: SubmissionErrorDialogData) {}

	ngOnInit() {
		this.results = this.data;
	}

	onClose(): void {
		this.dialog.close();
	}
}