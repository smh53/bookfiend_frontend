import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEditDialogComponent } from './author-edit-dialog.component';

describe('AuthorEditDialogComponent', () => {
  let component: AuthorEditDialogComponent;
  let fixture: ComponentFixture<AuthorEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorEditDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
