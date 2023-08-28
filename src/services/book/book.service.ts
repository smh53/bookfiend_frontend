import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BookResponse,BookRequest } from 'src/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getAllBooks() {
    return this._httpClient.get<BookResponse[]>(`${environment.bookUrl}`);
  }

  getBookDetails(id: number) {
    return this._httpClient.get<BookResponse>(`${environment.bookUrl}/${id}`)
  }

  editBook(id: number, book: BookRequest) {
    return this._httpClient.put<BookRequest>(`${environment.bookUrl}/${id}`, book)
  }
  deleteBook(id: number) {
    return this._httpClient.delete<BookRequest>(`${environment.bookUrl}/${id}`)
    
  }
  addBook(book: BookRequest) {
    return this._httpClient.post<BookRequest>(`${environment.bookUrl}`, book)
  }

}
