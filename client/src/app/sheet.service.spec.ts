import { TestBed, inject } from '@angular/core/testing';

import { SheetService } from './sheet.service';

describe('SheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetService]
    });
  });

  it('should be created', inject([SheetService], (service: SheetService) => {
    expect(service).toBeTruthy();
  }));
});
