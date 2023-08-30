import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as lodash from 'lodash';
import { ErrorDialog } from 'src/app/constants/notifications/sw2-dialog';
import { Toast } from 'src/app/constants/notifications/sw2-toast';
import { BookQuoteResponse, BookQuoteRequest } from 'src/models/bookQuote';
import { BookResponse } from 'src/models/book';
import { BookQuoteService } from 'src/services/book-quote/book-quote.service';
import { BookService } from 'src/services/book/book.service';
import { BookQuoteAddDialogComponent } from '../book-quote-add-dialog/book-quote-add-dialog.component';
import { BookQuoteEditDialogComponent } from '../book-quote-edit-dialog/book-quote-edit-dialog.component';
import { AuthorizationService } from 'src/services/authorization/authorization.service';
import { CLAIMTYPES, CLAIMVALUES } from 'src/app/constants/authorization/claims';

@Component({
  selector: 'app-book-quote-list',
  templateUrl: './book-quote-list.component.html',
  styleUrls: ['./book-quote-list.component.css']
})
export class BookQuoteListComponent {
  permissionCreate!: boolean;
  permissionDelete!: boolean;
  permissionUpdate!: boolean;
  public books: BookResponse[] = [];
  displayedColumns: string[] = ['quote', 'pageNumber','book.name','actions'];
  dataSource!: MatTableDataSource<BookQuoteResponse>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;
  quoteFilter = new FormControl('');
  pageNumberFilter = new FormControl('');
  bookNameFilter = new FormControl('');

  filterValues = {
    quote: '',
    pageNumber: '',
    bookName: '',
   

  };

  constructor
  (
    private _bookQuoteService: BookQuoteService,
    private _bookService: BookService,
    private _authorizationService: AuthorizationService,
    public dialog: MatDialog
    
  ) {

}

ngOnInit() {

  this.permissionCreate = this._authorizationService.checkClaims(CLAIMTYPES.bookQuote,CLAIMVALUES.create);
  this.permissionDelete = this._authorizationService.checkClaims(CLAIMTYPES.bookQuote,CLAIMVALUES.delete);
  this.permissionUpdate = this._authorizationService.checkClaims(CLAIMTYPES.bookQuote,CLAIMVALUES.update);
  

  this.getBookQuoteList();

  this.quoteFilter.valueChanges
    .subscribe(
      quote => {
        this.filterValues.quote = quote!;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  this.pageNumberFilter.valueChanges
    .subscribe(
      pageNumber => {
        this.filterValues.pageNumber = pageNumber!;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.bookNameFilter.valueChanges
    .subscribe(
      bookName => {
        this.filterValues.bookName = bookName!;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
}
  getBookQuoteList() {
    this._bookQuoteService.getAllBookQuotes().subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = lodash.get; 
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      },
      error: (e) => {
        ErrorDialog.fire({
          title:'Error',
          text: e.error.title,
          icon: 'warning'
        })
      },
      complete: () => {}
    });
  }



  openAddBookQuoteDialog() {
    this._bookService.getAllBooks().subscribe({
      next: (v) => {
        console.log(v);
        this.books = v;
        const dialogRef = this.dialog.open(BookQuoteAddDialogComponent, {
          data: {books: this.books},
          
          });
          dialogRef.afterClosed().subscribe(result => {           
            
            if(result != undefined) {
              console.log(result.data);
             
              

              this._bookQuoteService.addBookQuote(result.data).subscribe({
                next: (v) => {console.log(v);
                  result.data.id = v.id;
                },
                error: (e) => {
                  
                  var errorList = "";
                  if(e.error.errors != undefined)
                  {
                    if(e.error.errors.FirstName != undefined)              
                      errorList += e.error.errors.FirstName;          
                    if(e.error.errors.LastName != undefined)
                      errorList += e.error.errors.LastName;
      
                  }
                  ErrorDialog.fire({
                    title: e.error.title,
                    text: errorList
                  })
                },
                complete: () => {

                 
                 this.books.forEach(element => {
                    if(element.id == result.data.bookId)
                        result.data.book = element;
                  });
                  console.log(result.data);
                  this.dataSource.data.push(result.data);
                  this.dataSource._updateChangeSubscription();
                  Toast.fire({
                    icon: 'success',
                    title: 'Added',
                  })
                }
              });
              
             
            
            }
        })
      }
    })
  
  
    
  
  
  }
  openEditBookQuoteDialog(bookQuote: BookQuoteResponse) {
    this._bookService.getAllBooks().subscribe({
      next: (v) => {
        console.log(bookQuote);
        this.books = v;
        const dialogRef = this.dialog.open(BookQuoteEditDialogComponent, {
          data: { books: this.books, id: bookQuote.id, bookId: bookQuote.book.id, pageNumber: bookQuote.pageNumber, quote: bookQuote.quote},
          
        
          });
          dialogRef.afterClosed().subscribe(result => {           
            
            if(result != undefined) {
              console.log(result.data);
              
              this._bookQuoteService.editBookQuote(bookQuote.id, result.data).subscribe({
                next: (v) => {console.log(v);
                  
                },
                error: (e) => {
                  
                  var errorList = "";
                  if(e.error.errors != undefined)
                  {
                      errorList += e.error.errors;
                  }
                  ErrorDialog.fire({
                    title: e.error.title,
                    text: errorList
                  })
                },
                complete: () => {

                  this.books.forEach(element => {
                    if(element.id == result.data.bookId)
                        result.data.book = element;
                  });    

                const index = this.dataSource.data.indexOf(bookQuote) 
                
                this.dataSource.data[index] = result.data;       
                  
                this.dataSource._updateChangeSubscription();
                  Toast.fire({
                    icon: 'success',
                    title: 'Updated',
                  })
                }
              })
            }
        })
      }
    })
  }
  deleteBookQuote(bookQuote: BookQuoteResponse){
    this._bookQuoteService.deleteBookQuote(bookQuote.id).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
          ErrorDialog.fire({
            title:'Error',
            text: e.error.title,
            icon: 'warning'
          })
      },
      complete: () => {        
        const index = this.dataSource.data.indexOf(bookQuote) 
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); 
        Toast.fire({
          icon: 'success',
          title: 'Deleted',
        })
      }
    
    })
    
  }
  createFilter(): (data: BookQuoteResponse, filter: string) => boolean {
    let filterFunction = function(data:BookQuoteResponse, filter:string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.quote.toLowerCase().indexOf(searchTerms.quote) !== -1
        && data.pageNumber.toString().toLowerCase().indexOf(searchTerms.pageNumber) !== -1
        && data.book.name.toString().toLowerCase().indexOf(searchTerms.bookName) !== -1
    }
    return filterFunction;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
