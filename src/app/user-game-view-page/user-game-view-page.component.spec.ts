import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameViewPageComponent } from './user-game-view-page.component';

describe('UserGameViewPageComponent', () => {
  let component: UserGameViewPageComponent;
  let fixture: ComponentFixture<UserGameViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGameViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGameViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
