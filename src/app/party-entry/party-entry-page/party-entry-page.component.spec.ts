import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyEntryPageComponent } from './party-entry-page.component';

describe('PartyEntryPageComponent', () => {
  let component: PartyEntryPageComponent;
  let fixture: ComponentFixture<PartyEntryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyEntryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyEntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
