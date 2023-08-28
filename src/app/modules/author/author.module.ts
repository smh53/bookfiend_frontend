import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorListComponent } from './author-list/author-list.component';
import {  MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AuthorEditDialogComponent } from './author-edit-dialog/author-edit-dialog.component';
import { AuthorAddDialogComponent } from './author-add-dialog/author-add-dialog.component';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorEditDialogComponent,
    AuthorAddDialogComponent,
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
export class AuthorModule { }
