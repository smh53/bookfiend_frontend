import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Author } from 'src/models/author';

@Component({
  selector: 'app-author-add-dialog',
  templateUrl: './author-add-dialog.component.html',
  styleUrls: ['./author-add-dialog.component.css']
})
export class AuthorAddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AuthorAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Author,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    this.dialogRef.close({
      data: this.data
    })
  }
}
