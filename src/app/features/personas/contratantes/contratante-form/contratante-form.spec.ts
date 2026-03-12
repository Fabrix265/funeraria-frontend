import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratanteForm } from './contratante-form';

describe('ContratanteForm', () => {
  let component: ContratanteForm;
  let fixture: ComponentFixture<ContratanteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratanteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratanteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
