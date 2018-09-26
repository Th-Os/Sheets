import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionUploadErrorDialogComponent } from './submission-upload-error-dialog.component';

describe('SubmissionUploadErrorDialogComponent', () => {
  let component: SubmissionUploadErrorDialogComponent;
  let fixture: ComponentFixture<SubmissionUploadErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionUploadErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionUploadErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
