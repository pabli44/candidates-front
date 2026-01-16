import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesManagerComponent } from './candidates-manager.component';

describe('CandidatesManagerComponent', () => {
  let component: CandidatesManagerComponent;
  let fixture: ComponentFixture<CandidatesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
