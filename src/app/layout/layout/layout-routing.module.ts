import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from 'src/app/modules/author/author-list/author-list.component';
import { BookQuoteListComponent } from 'src/app/modules/book-quote/book-quote-list/book-quote-list.component';
import { BookListComponent } from 'src/app/modules/book/book-list/book-list.component';
import { AuthorizationGuardService } from 'src/services/authorization/authorization-guard.service';

const routes: Routes = [
  { path: 'author-list', component: AuthorListComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-quote-list', component: BookQuoteListComponent, canActivate: [AuthorizationGuardService], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
