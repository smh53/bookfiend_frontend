import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from '../footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthorModule } from 'src/app/modules/author/author.module';
import { NavigatiorComponent } from '../navigatior/navigatior.component';
import { BookModule } from 'src/app/modules/book/book.module';
import { BookQuoteModule } from 'src/app/modules/book-quote/book-quote.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavigatiorComponent,
  
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AuthorModule,
    BookModule,
    BookQuoteModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule

    
    
    

  ]
})
export class LayoutModule { }
