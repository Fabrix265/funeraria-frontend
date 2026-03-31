import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fallecidos } from './fallecidos';

describe('Fallecidos', () => {
  let component: Fallecidos;
  let fixture: ComponentFixture<Fallecidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fallecidos],
    }).compileComponents();

    fixture = TestBed.createComponent(Fallecidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
