import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Author } from 'src/models/author';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getAllAuthors() {
    return this._httpClient.get<Author[]>(`${environment.authorUrl}`);
  }

  getAuthorDetails(id: number) {
    return this._httpClient.get<Author>(`${environment.authorUrl}/${id}`)
  }

  editAuthor(id: number, author: Author) {
    return this._httpClient.put<Author>(`${environment.authorUrl}/${id}`, author)
  }
  deleteAuthor(id: number) {
    return this._httpClient.delete<Author>(`${environment.authorUrl}/${id}`)
    
  }
  addAuthor(author: Author) {
    return this._httpClient.post<Author>(`${environment.authorUrl}`, author)
  }

 

}
