import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallecidosList } from './fallecidos-list';

describe('FallecidosList', () => {
  let component: FallecidosList;
  let fixture: ComponentFixture<FallecidosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallecidosList],
    }).compileComponents();

    fixture = TestBed.createComponent(FallecidosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
