import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosList } from './vehiculos-list';

describe('VehiculosList', () => {
  let component: VehiculosList;
  let fixture: ComponentFixture<VehiculosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosList],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
