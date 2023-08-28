import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddDialogComponent } from './book-add-dialog.component';

describe('BookAddDialogComponent', () => {
  let component: BookAddDialogComponent;
  let fixture: ComponentFixture<BookAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookAddDialogComponent]
    });
    fixture = TestBed.createComponent(BookAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
