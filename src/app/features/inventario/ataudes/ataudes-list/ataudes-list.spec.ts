import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaudesList } from './ataudes-list';

describe('AtaudesList', () => {
  let component: AtaudesList;
  let fixture: ComponentFixture<AtaudesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaudesList],
    }).compileComponents();

    fixture = TestBed.createComponent(AtaudesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
