import { TestBed } from '@angular/core/testing';

import { BookQuoteService } from './book-quote.service';

describe('BookQuoteService', () => {
  let service: BookQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
