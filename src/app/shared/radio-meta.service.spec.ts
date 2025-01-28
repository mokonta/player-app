import { TestBed } from '@angular/core/testing';

import { RadioMetaService } from './radio-meta.service';

describe('RadioMetaService', () => {
  let service: RadioMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadioMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
