import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRequestPopupComponent } from './team-request-popup.component';

describe('TeamRequestPopupComponent', () => {
  let component: TeamRequestPopupComponent;
  let fixture: ComponentFixture<TeamRequestPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamRequestPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamRequestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
