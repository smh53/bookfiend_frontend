import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { ErrorDialog } from 'src/app/constants/notifications/sw2-dialog';
import { Toast } from 'src/app/constants/notifications/sw2-toast';
import { Author } from 'src/models/author';
import { BookRequest } from 'src/models/book';
import { AuthorService } from 'src/services/author/author.service';

@Component({
  selector: 'app-book-add-dialog',
  templateUrl: './book-add-dialog.component.html',
  styleUrls: ['./book-add-dialog.component.css']
})
export class BookAddDialogComponent {
  
  authorControl = new FormControl();
  filteredAuthors!: Observable<Author[]>;
  options: Author[] = [];
  constructor(
    public dialogRef: MatDialogRef<BookAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public authors: any,
    @Inject(MAT_DIALOG_DATA) public book: BookRequest,
   
  ) {}

  ngOnInit() {
    console.log(this.authors.authors);
    this.options = this.authors.authors
    this.filteredAuthors = this.authorControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      } ),
    );
  }

  displayFn(author: Author): string {
    return author ? (author.firstName + " "+  author.lastName) : '';
  }

  private _filter(value: string): Author[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => (option.firstName + " " + option.lastName).toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    if(this.authorControl.value != null)
      this.book.authorId = this.authorControl.value.id;
      console.log(this.book);

    this.dialogRef.close({
      data: this.book
    })
  }
}
