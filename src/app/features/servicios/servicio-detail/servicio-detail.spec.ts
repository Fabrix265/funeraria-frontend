import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideNoopSanitizer } from '@angular/core';
import { ServicioDetail } from './servicio-detail';
import { ToastService } from '../../../core/services/toast';

describe('ServicioDetail', () => {
  let component: ServicioDetail;
  let fixture: ComponentFixture<ServicioDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioDetail, HttpClientTestingModule],
      providers: [
        provideNoopSanitizer(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
        ToastService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
