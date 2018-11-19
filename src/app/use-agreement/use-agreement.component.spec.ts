import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseAgreementComponent } from './use-agreement.component';

describe('UseAgreementComponent', () => {
  let component: UseAgreementComponent;
  let fixture: ComponentFixture<UseAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
