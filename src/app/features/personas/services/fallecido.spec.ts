import { TestBed } from '@angular/core/testing';

import { Fallecido } from './fallecido';

describe('Fallecido', () => {
  let service: Fallecido;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fallecido);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
