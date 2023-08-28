import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditDialogComponent } from './book-edit-dialog.component';

describe('BookEditDialogComponent', () => {
  let component: BookEditDialogComponent;
  let fixture: ComponentFixture<BookEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditDialogComponent]
    });
    fixture = TestBed.createComponent(BookEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
