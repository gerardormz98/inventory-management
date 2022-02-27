import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherExpensesPageComponent } from './other-expenses-page.component';

describe('OtherExpensesPageComponent', () => {
  let component: OtherExpensesPageComponent;
  let fixture: ComponentFixture<OtherExpensesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherExpensesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherExpensesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
