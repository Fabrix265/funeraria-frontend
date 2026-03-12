import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratantesList } from './contratantes-list';

describe('ContratantesList', () => {
  let component: ContratantesList;
  let fixture: ComponentFixture<ContratantesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratantesList],
    }).compileComponents();

    fixture = TestBed.createComponent(ContratantesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
