import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Author } from 'src/models/author';

@Component({
  selector: 'app-author-edit-dialog',
  templateUrl: './author-edit-dialog.component.html',
  styleUrls: ['./author-edit-dialog.component.css']
})
export class AuthorEditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AuthorEditDialogComponent>,
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
