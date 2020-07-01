import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './model/contact';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getContuct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createContact(obj: Contact): Observable<any> {
    return this.http.post(`${this.baseUrl}`, obj);
  }

  updateConduct(obj: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${obj.id}`, obj);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getContuctList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
}

}
