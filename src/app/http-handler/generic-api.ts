import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export class GenericApi {
  apiUrl: string;
  constructor(key: string, private http: HttpClient) {
    this.apiUrl = 'http://localhost:2200/api/' + key + '/';
  }

  search(query: Object): any {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(this.apiUrl)?.subscribe({
          next: (n) => resolve(n),
          error: (e) => this.handleError(e),
        });
      } catch (err) {
        reject(err);
      } 
    });
  }

  create(url: string, body: Object): any {
    return new Promise((resolve, reject) => {
      try {
        this.http.post(this.apiUrl + url, body)?.subscribe({
          next: (n) => resolve(n),
          error: (e) => this.handleError(e),
        });
      } catch (err) {
        reject(err);
      } 
    });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.message);
  }
}
