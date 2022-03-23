import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUsernamePasswordComponent } from './modify-username-password.component';

describe('ModifyUsernamePasswordComponent', () => {
  let component: ModifyUsernamePasswordComponent;
  let fixture: ComponentFixture<ModifyUsernamePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyUsernamePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUsernamePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
