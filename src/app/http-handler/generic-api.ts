import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/User.model';

export class GenericApi<TModal> {
  apiUrl: string;
  constructor(key: string, private http: HttpClient) {
    this.apiUrl = 'http://localhost:2200/api/' + key;
  }

  search(query: any): any {
    return new Promise((resolve, reject) => {
      try {      
        this.http.get<TModal>(this.apiUrl, {params:query})?.subscribe({
          next: (val) => resolve(val),
          error: (err) => this.handleError(err),
        });
      } catch (err) {
        reject(err);
      } 
    });
  }

  create(url: string, body: Object): any {
    return new Promise((resolve, reject) => {
      url = url ? `/${url}`:'' 
      try {
        this.http.post<any>(this.apiUrl + url , body)?.subscribe({
          next: (val) => {
            if(val.status  == "error") reject(val?.message ??  val)
            resolve(val)
          },
          error: (err) => this.handleError(err),
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
