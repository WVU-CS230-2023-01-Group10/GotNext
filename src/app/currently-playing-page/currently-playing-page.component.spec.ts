import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlyPlayingPageComponent } from './currently-playing-page.component';

describe('CurrentlyPlayingPageComponent', () => {
  let component: CurrentlyPlayingPageComponent;
  let fixture: ComponentFixture<CurrentlyPlayingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentlyPlayingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentlyPlayingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
