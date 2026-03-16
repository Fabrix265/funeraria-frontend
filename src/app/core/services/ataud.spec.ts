import { TestBed } from '@angular/core/testing';

import { Ataud } from './ataud';

describe('Ataud', () => {
  let service: Ataud;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ataud);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
