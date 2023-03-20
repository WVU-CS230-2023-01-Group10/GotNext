import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostGameViewPageComponent } from './host-game-view-page.component';

describe('HostGameViewPageComponent', () => {
  let component: HostGameViewPageComponent;
  let fixture: ComponentFixture<HostGameViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostGameViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostGameViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
