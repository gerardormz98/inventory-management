import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailsPageComponent } from './purchase-details-page.component';

describe('PurchaseDetailsPageComponent', () => {
  let component: PurchaseDetailsPageComponent;
  let fixture: ComponentFixture<PurchaseDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
