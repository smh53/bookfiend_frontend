import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookQuoteListComponent } from './book-quote-list/book-quote-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BookQuoteAddDialogComponent } from './book-quote-add-dialog/book-quote-add-dialog.component';
import { BookQuoteEditDialogComponent } from './book-quote-edit-dialog/book-quote-edit-dialog.component';



@NgModule({
  declarations: [
    BookQuoteListComponent,
    BookQuoteAddDialogComponent,
    BookQuoteEditDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    SweetAlert2Module.forChild(
      {
        provideSwal: () => import('sweetalert2').then(({ default: swal }) => swal.mixin({
          // example: set global options here
          confirmButtonText: `Confirm`,
          cancelButtonText: `Cancel`,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#ff5757'
          
        }))
      })
  ]
})
export class BookQuoteModule { }
