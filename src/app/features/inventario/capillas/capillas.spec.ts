import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Capillas } from './capillas';

describe('Capillas', () => {
  let component: Capillas;
  let fixture: ComponentFixture<Capillas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Capillas],
    }).compileComponents();

    fixture = TestBed.createComponent(Capillas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
