import { TestBed, inject } from '@angular/core/testing';

import { MessageSnackbarService } from './message-snackbar.service';

describe('MessageSnackbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageSnackbarService]
    });
  });

  it('should be created', inject([MessageSnackbarService], (service: MessageSnackbarService) => {
    expect(service).toBeTruthy();
  }));
});
