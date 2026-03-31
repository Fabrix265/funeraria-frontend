import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ataudes } from './ataudes';

describe('Ataudes', () => {
  let component: Ataudes;
  let fixture: ComponentFixture<Ataudes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ataudes],
    }).compileComponents();

    fixture = TestBed.createComponent(Ataudes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
