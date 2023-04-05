import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBackendComponent } from './team-backend.component';

describe('TeamBackendComponent', () => {
  let component: TeamBackendComponent;
  let fixture: ComponentFixture<TeamBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamBackendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
