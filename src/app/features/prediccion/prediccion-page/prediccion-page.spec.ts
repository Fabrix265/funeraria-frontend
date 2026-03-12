import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrediccionPage } from './prediccion-page';

describe('PrediccionPage', () => {
  let component: PrediccionPage;
  let fixture: ComponentFixture<PrediccionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrediccionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PrediccionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
