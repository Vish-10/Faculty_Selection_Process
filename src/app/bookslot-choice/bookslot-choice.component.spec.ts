import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookslotChoiceComponent } from './bookslot-choice.component';

describe('BookslotChoiceComponent', () => {
  let component: BookslotChoiceComponent;
  let fixture: ComponentFixture<BookslotChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookslotChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookslotChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
