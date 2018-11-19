import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayOnPointComponent } from './stay-on-point.component';

describe('StayOnPointComponent', () => {
  let component: StayOnPointComponent;
  let fixture: ComponentFixture<StayOnPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayOnPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayOnPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
