import { TestBed } from '@angular/core/testing';

import { Contratante } from './contratante';

describe('Contratante', () => {
  let service: Contratante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contratante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
