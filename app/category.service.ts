
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Category } from './category';
import { MessageService } from './message.service';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({ providedIn: 'root' })
export class CategoryService {
 
  // URL to web api
  private apiUrl = 'api/';
  private categoriesUrl = this.apiUrl + 'categories';

  categories = this.getCategories();
  configured: Category[];
 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
 
  /** GET categories from the server */
  getCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(_ => this.log('fetched categories')),
        catchError(this.handleError<Category[]>('getCategories', []))
      );
  }
 
  /** GET category by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/?id=${id}`;
    return this.http.get<Category[]>(url)
      .pipe(
        map(categories => categories[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} category id=${id}`);
        }),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }
 
  /** GET category by id. Will 404 if id not found */
  getCategory(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }
 
  //////// Save methods //////////
 
  /** POST: add a new category to the server */
  addCategory (category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions).pipe(
      tap((newCategory: Category) => this.log(`added category w/ id=${newCategory.id}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }
 
  /** DELETE: delete the category from the server */
  deleteCategory (category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoriesUrl}/${id}`;
 
    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }
 
  /** PUT: update the category on the server */
  updateCategory (category: Category): Observable<any> {
    return this.http.put(this.categoriesUrl, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  swapCategory (id: number): Observable<any> { //Observable<any>
    console.log(this.categories);
    let swap = this.getCategory(id).subscribe(cat => this.categories.filter(h => h !== cat));
    //let a = swap as Category;
    //console.log(swap[0]);
    //console.log(swap);
    console.log(this.categories);
    //var passed = [12, 5, 8, 130, 44].filter(j=>j!==8); 
    //this.categories = this.categories.filter(h => h !== swap);
    //this.configured.push(swap);

    return swap;
  }

  restoreCategory (id: number): void { //Observable<any>
    let restore = this.getCategory(id);
    this.configured = this.configured.filter(h => h !== restore);
    this.categories.push(restore);

    /*return this.http.put(this.categoriesUrl, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );*/
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
 
  /** Log a CategoryService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`);
  }
}
