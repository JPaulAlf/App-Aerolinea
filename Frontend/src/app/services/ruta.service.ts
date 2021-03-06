import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BLOG_API_ENDPOINT = `${environment.apiUrl}/api/ruta`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/`, httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/${id}`);
  }

  create(ruta: any): Observable<any> {
    return this.http.post(`${BLOG_API_ENDPOINT}/create/`, ruta);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${BLOG_API_ENDPOINT}/delete/${id}`);
  }
  

  edit(id: string, ruta: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update/${id}`,ruta);
  }

  editState(id: string, ruta: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update-route-state/${id}`,ruta);
  }
}
