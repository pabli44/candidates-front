import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  //private apiUrl = 'http://localhost:3000/candidates';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  findOne(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`); 
  }

  deleteCandidate(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateCandidate(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  uploadCandidate(file: File, name: string, surname: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('surname', surname);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
