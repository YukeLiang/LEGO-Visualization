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

  // private _preFix: string = 'https://spreadsheet.google/feeds/list/';
  // private _sheetID: string = '1ddMERW93PAaj7D-8sHnFJv99w28d0Pg9vlMn9ke_qF4';
  // private _postFix: string = '/od6/public/values?alt=json';

  private _sheetUrl: string = 'https://script.google.com/macros/s/AKfycbxUH2DfUsBKMK8ZIU0uppQH7IY7nIA2un6RrFSUqtpqcpvQiZph/exec';

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
