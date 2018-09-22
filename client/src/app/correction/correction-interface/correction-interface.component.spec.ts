import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionInterfaceComponent } from './correction-interface.component';

describe('CorrectionInterfaceComponent', () => {
  let component: CorrectionInterfaceComponent;
  let fixture: ComponentFixture<CorrectionInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
