import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManageSlotsComponent } from './doc-manage-slots.component';

describe('DocManageSlotsComponent', () => {
  let component: DocManageSlotsComponent;
  let fixture: ComponentFixture<DocManageSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManageSlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManageSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
