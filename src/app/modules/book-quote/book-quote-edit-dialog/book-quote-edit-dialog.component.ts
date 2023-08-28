import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { BookQuoteRequest } from 'src/models/bookQuote';
import { BookResponse } from 'src/models/book';

@Component({
  selector: 'app-book-quote-edit-dialog',
  templateUrl: './book-quote-edit-dialog.component.html',
  styleUrls: ['./book-quote-edit-dialog.component.css']
})
export class BookQuoteEditDialogComponent {
  currentBook!: BookResponse;
  bookControl = new FormControl();
  filteredBooks!: Observable<BookResponse[]>;
  options: BookResponse[] = [];
  constructor(
    public dialogRef: MatDialogRef<BookQuoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public books: any,
    @Inject(MAT_DIALOG_DATA) public bookQuote: BookQuoteRequest,
   
  ) {}

  ngOnInit() {
    console.log(this.bookQuote);
    this.options = this.books.books;

    this.options.forEach(element => {
      if(element.id == this.bookQuote.bookId)
        this.currentBook = element;
    });
    this.bookControl.setValue(this.currentBook);

    this.filteredBooks = this.bookControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      } ),
    );
  }

  displayFn(book: BookResponse): string {
    return book ? book.name : '';
  }

  private _filter(value: string): BookResponse[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    if(this.bookControl.value != null)
      this.bookQuote.bookId = this.bookControl.value.id;
      console.log(this.bookQuote);
      
    this.dialogRef.close({
      data: this.bookQuote
    })
  }
}
