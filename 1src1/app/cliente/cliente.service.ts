import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiURL = "http://127.0.0.1:8000/api/cliente";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }
  

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
    console.log("<--------------------1---------------------->");
  }
 
  create(cliente: any): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.apiURL, JSON.stringify(cliente), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  find(id: any): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  update(id: any, cliente: any): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.apiURL + id, JSON.stringify(cliente), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  delete(id: any){
    return this.httpClient.delete<Cliente>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
