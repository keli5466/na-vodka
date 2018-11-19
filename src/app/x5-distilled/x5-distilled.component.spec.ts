import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { X5DistilledComponent } from './x5-distilled.component';

describe('X5DistilledComponent', () => {
  let component: X5DistilledComponent;
  let fixture: ComponentFixture<X5DistilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ X5DistilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(X5DistilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
