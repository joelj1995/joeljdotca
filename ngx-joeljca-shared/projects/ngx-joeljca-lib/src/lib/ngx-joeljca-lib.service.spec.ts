import { TestBed } from '@angular/core/testing';

import { NgxJoeljcaLibService } from './ngx-joeljca-lib.service';

describe('NgxJoeljcaLibService', () => {
  let service: NgxJoeljcaLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxJoeljcaLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
