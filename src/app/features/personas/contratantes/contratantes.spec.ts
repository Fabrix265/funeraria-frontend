import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contratantes } from './contratantes';

describe('Contratantes', () => {
  let component: Contratantes;
  let fixture: ComponentFixture<Contratantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contratantes],
    }).compileComponents();

    fixture = TestBed.createComponent(Contratantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
