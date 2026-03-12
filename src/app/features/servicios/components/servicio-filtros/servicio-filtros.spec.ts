import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioFiltros } from './servicio-filtros';

describe('ServicioFiltros', () => {
  let component: ServicioFiltros;
  let fixture: ComponentFixture<ServicioFiltros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioFiltros],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioFiltros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
