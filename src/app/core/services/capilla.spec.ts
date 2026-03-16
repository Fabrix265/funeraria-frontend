import { TestBed } from '@angular/core/testing';

import { Capilla } from './capilla';

describe('Capilla', () => {
  let service: Capilla;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Capilla);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
