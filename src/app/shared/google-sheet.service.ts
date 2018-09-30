import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs';

import { Data } from '../shared/classes';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {

  private _sheetUrl: string = 'https://script.google.com/macros/s/AKfycbwtrF0otHm0yKXb_K8n4tr37EJjR8BJBvkoOkFw5xbW2-HL8pMF/exec';
// 2nd is test
  constructor(private _http: HttpClient) { }

  public loadData(): Observable<any> {
    return this._http.get<any>(this._sheetUrl)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        return throwError('error');
    }
  }
  
}
