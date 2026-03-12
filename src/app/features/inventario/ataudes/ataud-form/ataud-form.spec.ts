import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaudForm } from './ataud-form';

describe('AtaudForm', () => {
  let component: AtaudForm;
  let fixture: ComponentFixture<AtaudForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaudForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AtaudForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
