import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BookQuoteResponse, BookQuoteRequest } from 'src/models/bookQuote';

@Injectable({
  providedIn: 'root'
})
export class BookQuoteService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  getAllBookQuotes() {
    return this._httpClient.get<BookQuoteResponse[]>(`${environment.bookQuoteUrl}`);
  }

  getBookQuoteDetails(id: number) {
    return this._httpClient.get<BookQuoteResponse>(`${environment.bookQuoteUrl}/${id}`)
  }

  editBookQuote(id: number, bookQuote: BookQuoteRequest) {
    return this._httpClient.put<BookQuoteRequest>(`${environment.bookQuoteUrl}/${id}`, bookQuote)
  }
  deleteBookQuote(id: number) {
    return this._httpClient.delete<BookQuoteRequest>(`${environment.bookQuoteUrl}/${id}`)
    
  }
  addBookQuote(bookQuote: BookQuoteRequest) {
    return this._httpClient.post<BookQuoteRequest>(`${environment.bookQuoteUrl}`, bookQuote)
  }

}
