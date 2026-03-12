import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioDetalle } from './servicio-detalle';

describe('ServicioDetalle', () => {
  let component: ServicioDetalle;
  let fixture: ComponentFixture<ServicioDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
