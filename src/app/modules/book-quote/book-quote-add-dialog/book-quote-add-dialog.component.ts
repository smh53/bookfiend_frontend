import { Component, Inject } from '@angular/core';
import { BookResponse } from 'src/models/book';
import { BookAddDialogComponent } from '../../book/book-add-dialog/book-add-dialog.component';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { BookQuoteRequest,BookQuoteResponse } from 'src/models/bookQuote';

@Component({
  selector: 'app-book-quote-add-dialog',
  templateUrl: './book-quote-add-dialog.component.html',
  styleUrls: ['./book-quote-add-dialog.component.css']
})
export class BookQuoteAddDialogComponent {
  bookControl = new FormControl();
  filteredBooks!: Observable<BookResponse[]>;
  options: BookResponse[] = [];
  constructor(
    public dialogRef: MatDialogRef<BookAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public books: any,
    @Inject(MAT_DIALOG_DATA) public bookQuote: BookQuoteRequest,
   
  ) {}

  ngOnInit() {
    console.log(this.books.books);
    this.options = this.books.books
    this.filteredBooks = this.bookControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      } ),
    );
  }

  displayFn(book: BookResponse): string {
    return book ? (book.name) : '';
  }

  private _filter(value: string): BookResponse[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => (option.name).toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    if(this.bookControl.value != null)
    {
      
      this.bookQuote.bookId = this.bookControl.value.id;
      console.log(this.bookQuote);
    }
     

    this.dialogRef.close({
      data: this.bookQuote
    })
  }
}
