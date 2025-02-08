import { TestBed } from '@angular/core/testing';

import { RadioWebSocketDataService } from './radio-web-socket-data.service';

describe('RadioWebSocketDataService', () => {
  let service: RadioWebSocketDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadioWebSocketDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
