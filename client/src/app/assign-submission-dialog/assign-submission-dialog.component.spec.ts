import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSubmissionDialogComponent } from './assign-submission-dialog.component';

describe('AssignSubmissionDialogComponent', () => {
  let component: AssignSubmissionDialogComponent;
  let fixture: ComponentFixture<AssignSubmissionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSubmissionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
