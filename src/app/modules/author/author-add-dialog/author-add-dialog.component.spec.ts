import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAddDialogComponent } from './author-add-dialog.component';

describe('AuthorAddDialogComponent', () => {
  let component: AuthorAddDialogComponent;
  let fixture: ComponentFixture<AuthorAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorAddDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
