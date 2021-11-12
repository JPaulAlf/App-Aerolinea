import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BLOG_API_ENDPOINT = `${environment.apiUrl}/api/vuelo`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get-flight`, httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/getBy-flight/${id}`);
  }

  create(vuelo: any): Observable<any> {
    return this.http.post(`${BLOG_API_ENDPOINT}/add-flight`, vuelo);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${BLOG_API_ENDPOINT}/delete-flight/${id}`);
  }

  edit(id: string, vuelo: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update-flight/${id}`,vuelo);
  }

}
