import { TestBed } from '@angular/core/testing';

import { AuthfbService } from './authfb.service';

describe('AuthfbService', () => {
  let service: AuthfbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthfbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
