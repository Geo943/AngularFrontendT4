import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Post } from './post';
    
@Injectable({
  providedIn: 'root'
})
export class PostService {
    
  private apiURL = "http://127.0.0.1:8000/api";

    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/cliente')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(post: any): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/clientec', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    //crear una metodo para esta consulta
  find(id: any): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '/cliente/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: number, post: Post): Observable<Post> {
    // console.log("----------------error 1----------------------");
    // console.log(post);

    return this.httpClient.put<Post>(this.apiURL + '/clienteup/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
    )
    // console.log(post);
    
  }
    
  delete(id: any){
    return this.httpClient.delete<Post>(this.apiURL + '/clientedel/' + id, this.httpOptions)
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