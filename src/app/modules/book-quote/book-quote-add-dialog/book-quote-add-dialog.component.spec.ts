import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookQuoteAddDialogComponent } from './book-quote-add-dialog.component';

describe('BookQuoteAddDialogComponent', () => {
  let component: BookQuoteAddDialogComponent;
  let fixture: ComponentFixture<BookQuoteAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookQuoteAddDialogComponent]
    });
    fixture = TestBed.createComponent(BookQuoteAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
