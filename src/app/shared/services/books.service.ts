import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import API from '../constants/api';
import { Book } from '../models/book';
import { COMMERCIAL_OFFERS } from '../models/offers';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books:Book[] = [];

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {

    return this.http.get<Book[]>( API.BASE_URL + API.BOOKS ).pipe(
			tap(_ => this.log(`fetched books`)),
			catchError(this.handleError('getBooks', []))
		);
  }

  getCommercialOffers(params: string){
    return this.http.get<COMMERCIAL_OFFERS>( API.BASE_URL + API.OFFERS(params) ).pipe(
			tap(_ => this.log(`fetched offers`)),
			catchError(this.handleError('getCommercialOffers', { "offers": []} ))
		);
  }

  /* handleError */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`[${operation} failed]: ${error.message}`);
			console.error(error);
			
			return of(result as T);
		};
	}

	/* log */
	private log(log: string) {
		console.info(log);
	}
}