import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StrorageService {
  constructor() {}

  getToken(): String | null {
    return (
      sessionStorage.getItem('x-access-token') ??
      localStorage.getItem('x-access-token')
    );
  }
}
