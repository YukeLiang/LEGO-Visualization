import { TestBed } from '@angular/core/testing';

import { GoogleSheetService } from './google-sheet.service';

describe('GoogleSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleSheetService = TestBed.get(GoogleSheetService);
    expect(service).toBeTruthy();
  });
});
