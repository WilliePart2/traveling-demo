import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryUpdatingFormComponent } from './country-updating-form.component';

describe('CountryUpdatingFormComponent', () => {
  let component: CountryUpdatingFormComponent;
  let fixture: ComponentFixture<CountryUpdatingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryUpdatingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryUpdatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
