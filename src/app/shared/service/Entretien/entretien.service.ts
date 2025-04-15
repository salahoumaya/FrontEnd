import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {
  private apiUrl = 'http://localhost:8076/entretiens'; // URL mise à jour

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addEntretien(entretien: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/admin/add-entretien`,
      entretien,
      { headers: this.getHeaders() }
    );
  }

  getEntretiens(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/retrieve-all-entretiens`, { headers: this.getHeaders() });
  }

  getEntretienById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/admin/retrieve-entretien/${id}`,
      { headers: this.getHeaders() }
    );
  }

  modifyEntretien(entretien: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/admin/modify-entretien`,
      entretien,
      { headers: this.getHeaders() }
    );
  }

  removeEntretien(entretienId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/admin/remove-entretien/${entretienId}`,
      { headers: this.getHeaders() }
    );
  }
}
