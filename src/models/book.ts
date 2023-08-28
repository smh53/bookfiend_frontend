import { Author } from "./author";

export interface BookRequest {
    id: number,
    name: string,
    volume: number,
    printary: string,
    authorId: number,
    publishYear: number,
   
}

export interface BookResponse {
    id: number,
    name: string,
    volume: number,
    printary: string,
    publishYear: number,
    author: Author
}