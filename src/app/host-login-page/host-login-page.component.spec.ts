import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostLoginPageComponent } from './host-login-page.component';

describe('HostLoginPageComponent', () => {
  let component: HostLoginPageComponent;
  let fixture: ComponentFixture<HostLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
