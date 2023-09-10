import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Toast } from 'src/app/constants/notifications/sw2-toast';
import { Author } from 'src/models/author';
import { AuthorService } from 'src/services/author/author.service';
import Swal from 'sweetalert2';
import { AuthorEditDialogComponent } from '../author-edit-dialog/author-edit-dialog.component';
import { AuthorAddDialogComponent } from '../author-add-dialog/author-add-dialog.component';
import { ErrorDialog, InfoDialog } from 'src/app/constants/notifications/sw2-dialog';
import { CLAIMTYPES, CLAIMVALUES } from 'src/app/constants/authorization/claims';
import { AuthorizationService } from 'src/services/authorization/authorization.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  permissionCreate!: boolean;
  permissionDelete!: boolean;
  permissionUpdate!: boolean;
  public authors: Author[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
  dataSource!: MatTableDataSource<Author>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;
  firstNameFilter = new FormControl('');
  lastNameFilter = new FormControl('');
  filterValues = {
    firstName: '',
    lastName: '',
  };

  constructor
    (
      private _authorService: AuthorService,
      private _authorizationService: AuthorizationService,
      public dialog: MatDialog
      
    ) {

  }
  
  ngOnInit() {
    const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(environment.endPoint +"AuthorHub")
    
    .build();

    connection.start().then(function () {
      console.log('signalR Connected!');
      

    }).catch(function(err) {
      return console.error(err.toString())
    });

    connection.on("AuthorDeleted", (deletedAutor: string, ) => {
     var jsonDeletedAuthor = JSON.parse(deletedAutor);
    
      console.log(jsonDeletedAuthor);
     
      Toast.fire({
        title: 'Notification',
        icon: 'info',
        text: 'Author '  +' ' + jsonDeletedAuthor.FirstName + ' ' + jsonDeletedAuthor.LastName + ' deleted',
        
      })
      
    });

    

    this.permissionCreate = this._authorizationService.checkClaims(CLAIMTYPES.author,CLAIMVALUES.create);
    this.permissionDelete = this._authorizationService.checkClaims(CLAIMTYPES.author,CLAIMVALUES.delete);
    this.permissionUpdate = this._authorizationService.checkClaims(CLAIMTYPES.author,CLAIMVALUES.update);
  
    
    
    this.getAuthorList();

    this.firstNameFilter.valueChanges
      .subscribe(
        firstName => {
          this.filterValues.firstName = firstName!;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lastNameFilter.valueChanges
      .subscribe(
        lastName => {
          this.filterValues.lastName = lastName!;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  getAuthorList() {
    this._authorService.getAllAuthors().subscribe((response => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
    }));
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.firstName.toLowerCase().indexOf(searchTerms.firstName) !== -1
        && data.lastName.toString().toLowerCase().indexOf(searchTerms.lastName) !== -1
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

  deleteAuthor(author: Author){
    this._authorService.deleteAuthor(author.id).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
          ErrorDialog.fire({
            title:'Error',
            text: e.error.title,
            icon: 'warning'
          })
      },
      complete: () => {        
        const index = this.dataSource.data.indexOf(author) 
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); 
        Toast.fire({
          icon: 'success',
          title: 'Deleted',
        })
      }
    
    })
  }


  openEditAuthorDialog(author: Author){

         const dialogRef = this.dialog.open(AuthorEditDialogComponent, {
            data: {id: author.id, firstName: author.firstName, lastName: author.lastName },
          });
          dialogRef.afterClosed().subscribe(result => { 
            
            if(result != undefined) {
            this._authorService.editAuthor(author.id,result.data).subscribe({
              next: (v) => {},
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
                const index = this.dataSource.data.indexOf(author) 
                this.dataSource.data[index].firstName = result.data.firstName;
                this.dataSource.data[index].lastName = result.data.lastName;
                this.dataSource.data[index].id = result.data.id;
                this.dataSource._updateChangeSubscription();
                Toast.fire({
                  icon: 'success',
                  title: 'Updated',
                })
              }
            });
          }
          });
          
        
      
      
   
  }

  openAddAuthorDialog() {
    const dialogRef = this.dialog.open(AuthorAddDialogComponent, {
    data: {}
    });

    dialogRef.afterClosed().subscribe(result => {           
      console.log(result.data);
      if(result != undefined) {
        this._authorService.addAuthor(result.data).subscribe({
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
            this.dataSource.data.push(result.data);
            this.dataSource._updateChangeSubscription();
            Toast.fire({
              icon: 'success',
              title: 'Added',
            })
          }
        })
      }
  })


}

}
