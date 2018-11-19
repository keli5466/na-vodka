import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDrinkSliderComponent } from './featured-drink-slider.component';

describe('FeaturedDrinkSliderComponent', () => {
  let component: FeaturedDrinkSliderComponent;
  let fixture: ComponentFixture<FeaturedDrinkSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedDrinkSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedDrinkSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
