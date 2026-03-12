import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapillasList } from './capillas-list';

describe('CapillasList', () => {
  let component: CapillasList;
  let fixture: ComponentFixture<CapillasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapillasList],
    }).compileComponents();

    fixture = TestBed.createComponent(CapillasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
