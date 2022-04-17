import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GroceriesServiceService {

  groceries: any = [];

  dataChanged$: Observable<boolean>;
  baseURL = 'http://localhost:8080';

  public dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<any> {
    return this.http.get(`${this.baseURL}/api/groceries`).pipe(map(this.extractData), catchError(this.handleError));
  }

  addItem(groceryItem) {
    this.http.post(`${this.baseURL}/api/groceries`, groceryItem).subscribe(res => {
      this.groceries = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(id, groceryItem) {
    this.http.put(`${this.baseURL}/api/groceries/${id}`, groceryItem).subscribe(res => {
      this.groceries = res;
      this.dataChangeSubject.next(true);
    });
  }

  removeItem(id) {
    this.http.delete(`${this.baseURL}/api/groceries/${id}`).subscribe(res => {
      this.groceries = res;
      this.dataChangeSubject.next(true);
    });
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    if (error instanceof Response) {
      const err = error || '';
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    console.error(errorMessage);
    return errorMessage;
  }
}