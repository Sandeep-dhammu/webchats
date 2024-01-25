import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, firstValueFrom, map, pipe, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export class GenericApi<TModal> {
  private http: HttpClient;
  private apiUrl: string;
  private toastr?: ToastrService;

  constructor(url: string) {
    this.http = inject(HttpClient);
    this.toastr = inject(ToastrService);
    this.apiUrl = 'http://localhost:2200/api/' + url;
  }

  search(query: any): any {
    return firstValueFrom(this.http.get<TModal>(this.apiUrl, query)).catch(this.handleError);
  }

   create(url: string, body: Object): any {
    url = url ? `/${url}` : '';
    return firstValueFrom(this.http.post(this.apiUrl + url, body)).catch(this.handleError);
  }

  private handleError({error}:HttpErrorResponse) {
    throw error?.message ?? error ?? "Somthing went wrong!"
  }
}
