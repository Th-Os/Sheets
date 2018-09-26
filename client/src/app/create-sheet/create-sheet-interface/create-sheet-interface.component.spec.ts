import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSheetInterfaceComponent } from './create-sheet-interface.component';

describe('CreateSheetInterfaceComponent', () => {
  let component: CreateSheetInterfaceComponent;
  let fixture: ComponentFixture<CreateSheetInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSheetInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSheetInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
