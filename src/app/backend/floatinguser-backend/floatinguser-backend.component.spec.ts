import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatinguserBackendComponent } from './floatinguser-backend.component';

describe('FloatinguserBackendComponent', () => {
  let component: FloatinguserBackendComponent;
  let fixture: ComponentFixture<FloatinguserBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatinguserBackendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatinguserBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
