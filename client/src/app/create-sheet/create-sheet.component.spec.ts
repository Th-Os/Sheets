import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSheetComponent } from './create-sheet.component';

describe('CreateSheetComponent', () => {
  let component: CreateSheetComponent;
  let fixture: ComponentFixture<CreateSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
