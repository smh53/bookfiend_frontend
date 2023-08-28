import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorDialog } from 'src/app/constants/notifications/sw2-dialog';
import { Toast } from 'src/app/constants/notifications/sw2-toast';
import { BookResponse,BookRequest } from 'src/models/book';
import { BookService } from 'src/services/book/book.service';
import { BookAddDialogComponent } from '../book-add-dialog/book-add-dialog.component';
import { AuthorService } from 'src/services/author/author.service';
import { Author } from 'src/models/author';
import { BookEditDialogComponent } from '../book-edit-dialog/book-edit-dialog.component';
import * as lodash from 'lodash';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  public authors: Author[] = [];
  displayedColumns: string[] = ['name','author.firstName','author.lastName','publishYear', 'actions'];
  dataSource!: MatTableDataSource<BookResponse>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;
  nameFilter = new FormControl('');
  authorFirstNameFilter = new FormControl('');
  authorLastNameFilter = new FormControl('');
  publishYearFilter = new FormControl('');
  filterValues = {
    name: '',
    authorFirstName: '',
    authorLastName: '',
    publishYear: ''

  };

  constructor
  (
    private _bookService: BookService,
    private _authorService: AuthorService,
    public dialog: MatDialog
    
  ) {

}

ngOnInit() {
  this.getBookList();

  this.nameFilter.valueChanges
    .subscribe(
      name => {
        this.filterValues.name = name!;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
 

  

    this.authorFirstNameFilter.valueChanges
    .subscribe(
      authorFirstName => {
        this.filterValues.authorFirstName = authorFirstName!;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.authorLastNameFilter.valueChanges
    .subscribe(
      authorLastName => {
        this.filterValues.authorLastName = authorLastName!;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    this.publishYearFilter.valueChanges
    .subscribe(
      publishYear => {
        this.filterValues.publishYear = publishYear!;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
}
  getBookList() {
    this._bookService.getAllBooks().subscribe({
      next: (response) => {
        
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



  openAddBookDialog() {
    this._authorService.getAllAuthors().subscribe({
      next: (v) => {
        console.log(v);
        this.authors = v;
        const dialogRef = this.dialog.open(BookAddDialogComponent, {
          data: {authors: this.authors},
          
          });
          dialogRef.afterClosed().subscribe(result => {           
            
            if(result != undefined) {
              console.log(result.data);
              
              this._bookService.addBook(result.data).subscribe({
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

                  console.log(result.data);
                  this.authors.forEach(element => {
                    if(element.id == result.data.authorId)
                        result.data.author = element;
                  });
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
  openEditBookDialog(book: BookResponse) {
    this._authorService.getAllAuthors().subscribe({
      next: (v) => {
        console.log(book);
        this.authors = v;
        const dialogRef = this.dialog.open(BookEditDialogComponent, {
          data: {authors: this.authors, author: book.author, id: book.id, authorId: book.author.id, publishYear: book.publishYear, name: book.name},
          
        
          });
          dialogRef.afterClosed().subscribe(result => {           
            
            if(result != undefined) {
              console.log(result.data);
              
              this._bookService.editBook(book.id, result.data).subscribe({
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

                  this.authors.forEach(element => {
                    if(element.id == result.data.authorId)
                        result.data.author = element;
                  });

                const index = this.dataSource.data.indexOf(book) 
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
  deleteBook(book: BookResponse){
    this._bookService.deleteBook(book.id).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
          ErrorDialog.fire({
            title:'Error',
            text: e.error.title,
            icon: 'warning'
          })
      },
      complete: () => {        
        const index = this.dataSource.data.indexOf(book) 
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); 
        Toast.fire({
          icon: 'success',
          title: 'Deleted',
        })
      }
    
    })
    
  }
  createFilter(): (data: BookResponse, filter: string) => boolean {
    let filterFunction = function(data:BookResponse, filter:string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.author.firstName.toString().toLowerCase().indexOf(searchTerms.authorFirstName) !== -1
        && data.author.lastName.toString().toLowerCase().indexOf(searchTerms.authorLastName) !== -1
        && data.publishYear.toString().toLowerCase().indexOf(searchTerms.publishYear) !== -1
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
