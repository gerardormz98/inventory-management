import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantEditFormComponent } from './product-variant-edit-form.component';

describe('ProductVariantEditPageComponent', () => {
  let component: ProductVariantEditFormComponent;
  let fixture: ComponentFixture<ProductVariantEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVariantEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
