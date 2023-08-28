import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookQuoteListComponent } from './book-quote-list.component';

describe('BookQuoteListComponent', () => {
  let component: BookQuoteListComponent;
  let fixture: ComponentFixture<BookQuoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookQuoteListComponent]
    });
    fixture = TestBed.createComponent(BookQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
