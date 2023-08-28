import { BookResponse } from "./book";

export interface BookQuoteResponse {
    id: number,
    quote: string,
    pageNumber: number,
    book: BookResponse
}

export interface BookQuoteRequest {
    id: number,
    quote: string,
    pageNumber: number,
    bookId: number
}