import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8076/admin/reclamations';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Obtenir toutes les réclamations
  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // ✅ Obtenir une réclamation par id
  getReclamationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Mettre à jour le statut et la réponse
  updateReclamation(id: number, status: string, responseMessage: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}/update`, null, {
      headers: this.getAuthHeaders(),
      params: {
        status: status,
        responseMessage: responseMessage || ''
      }
    });
  }

  // ✅ Supprimer une réclamation
  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
