import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCreate } from './servicio-create';

describe('ServicioCreate', () => {
  let component: ServicioCreate;
  let fixture: ComponentFixture<ServicioCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
