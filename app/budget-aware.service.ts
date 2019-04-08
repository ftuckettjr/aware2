import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './category';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BudgetAwareService {
	
  private apiUrl = 'api';  // URL to web api
  private categoryUrl = this.apiUrl + '/category.asmx';

  constructor(
  		private http: HttpClient,
    	private messageService: MessageService) { }

  /** GET category from the server */
  getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        tap(_ => this.log('fetched categories')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a BudgetAwareService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BudgetAwareService: ${message}`);
  }
}
