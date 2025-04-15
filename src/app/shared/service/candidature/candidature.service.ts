import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8076/candidatures';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les en-têtes, y compris le token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajoute le token dans l'en-tête
    });
  }

  // Ajoute une candidature
  addCandidature(candidature: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/admin/add-candidature`,
      candidature,
      { headers: this.getHeaders() }
    );
  }

  // Récupère toutes les candidatures
  getCandidatures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/retrieve-all-candidatures`, { headers: this.getHeaders() });
  }

  // Récupère une candidature par ID
  getCandidatureById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/admin/retrieve-candidature/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // Modifie une candidature
  modifyCandidature(candidature: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/admin/modify-candidature`,
      candidature,
      { headers: this.getHeaders() }
    );
  }

  // Supprime une candidature
  removeCandidature(candidatureId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/admin/remove-candidature/${candidatureId}`,
      { headers: this.getHeaders() }
    );
  }

  // Méthode pour télécharger le PDF des candidatures
  downloadPdf(): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/admin/download-pdf`, {
      responseType: 'blob' as 'json', // Définit le type de réponse comme Blob
      headers: this.getHeaders() // Inclut les en-têtes avec le token
    });
  }



  sendConfirmationEmail(email: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/admin/send-confirmation-email`,
      { email }, // Utilisation directe d'un objet JSON
      { headers: this.getHeaders() }
    );
  }

}

