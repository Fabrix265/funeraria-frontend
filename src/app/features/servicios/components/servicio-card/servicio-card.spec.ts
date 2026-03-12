import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCard } from './servicio-card';

describe('ServicioCard', () => {
  let component: ServicioCard;
  let fixture: ComponentFixture<ServicioCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
