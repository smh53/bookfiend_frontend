import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { Author } from 'src/models/author';
import { BookRequest } from 'src/models/book';

@Component({
  selector: 'app-book-edit-dialog',
  templateUrl: './book-edit-dialog.component.html',
  styleUrls: ['./book-edit-dialog.component.css']
})
export class BookEditDialogComponent {
  currentAuthor!: Author
  authorControl = new FormControl();
  filteredAuthors!: Observable<Author[]>;
  options: Author[] = [];
  constructor(
    public dialogRef: MatDialogRef<BookEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public authors: any,
    @Inject(MAT_DIALOG_DATA) public book: BookRequest,
   
  ) {}

  ngOnInit() {
    console.log(this.book);
    this.options = this.authors.authors
    this.options.forEach(element => {
      if(element.id == this.book.authorId)
        this.currentAuthor = element;
    });
    this.authorControl.setValue(this.currentAuthor);
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
