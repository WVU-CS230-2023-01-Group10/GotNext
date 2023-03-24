import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartycodeBackendComponent } from './partycode-backend.component';

describe('PartycodeBackendComponent', () => {
  let component: PartycodeBackendComponent;
  let fixture: ComponentFixture<PartycodeBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartycodeBackendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartycodeBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
