import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesPageComponent } from './taxes-page.component';

describe('TaxesPageComponent', () => {
  let component: TaxesPageComponent;
  let fixture: ComponentFixture<TaxesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
