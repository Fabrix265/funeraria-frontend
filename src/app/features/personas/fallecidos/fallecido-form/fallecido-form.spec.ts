import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallecidoForm } from './fallecido-form';

describe('FallecidoForm', () => {
  let component: FallecidoForm;
  let fixture: ComponentFixture<FallecidoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallecidoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(FallecidoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
