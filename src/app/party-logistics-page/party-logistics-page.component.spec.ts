import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyLogisticsPageComponent } from './party-logistics-page.component';

describe('PartyLogisticsPageComponent', () => {
  let component: PartyLogisticsPageComponent;
  let fixture: ComponentFixture<PartyLogisticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyLogisticsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyLogisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
