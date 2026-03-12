import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapillaForm } from './capilla-form';

describe('CapillaForm', () => {
  let component: CapillaForm;
  let fixture: ComponentFixture<CapillaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapillaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CapillaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
