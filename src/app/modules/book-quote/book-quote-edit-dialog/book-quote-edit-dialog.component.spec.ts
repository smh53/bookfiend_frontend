import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookQuoteEditDialogComponent } from './book-quote-edit-dialog.component';

describe('BookQuoteEditDialogComponent', () => {
  let component: BookQuoteEditDialogComponent;
  let fixture: ComponentFixture<BookQuoteEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookQuoteEditDialogComponent]
    });
    fixture = TestBed.createComponent(BookQuoteEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
