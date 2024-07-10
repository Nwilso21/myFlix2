import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const apiUrl = 'https://vast-garden-26469-856928a3215d.herokuapp.com';


@Injectable({
  providedIn: 'root',
})
export class ErrorAndResponseService {
  constructor(protected http: HttpClient) {}

  protected handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    const err = new Error('Something went wrong, please try again later.');
    throwError(() => err);
  }
  protected extractResponseData(res: any): any {
    return res || {};
  }
}

@Injectable({
  providedIn: 'root',
})

export class UserRegistrationService extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/users', userDetails)
        .pipe(catchError(this.handleError));
}
}

@Injectable({
  providedIn: 'root',
})
export class UserLogin extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + `/login?Username=${userDetails.username}&Password=${userDetails.password}`, userDetails)
        .pipe(map(this.extractResponseData), catchError(this.handleError))
}
}

@Injectable({
  providedIn: 'root',
})
export class fetchMovies extends ErrorAndResponseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getAllMovies(): Observable<any> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');

      return this.http
        .get(apiUrl + '/movies', {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    } else {
      console.error('localStorage is not available in this environment.');
      return throwError(
        () => new Error('localStorage is not available in this environment.')
      );
    }
  }
}




