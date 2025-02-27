import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userTestService {
  private baseUrl = 'http://localhost:8076/user/tests';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Token envoyé:', token);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Récupérer tous les tests disponibles
  getTests(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // ✅ Récupérer un test spécifique par ID
  getTestById(testId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${testId}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Soumettre les réponses d'un test et récupérer le score
  submitTest(submissionData: any): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/submit`, submissionData, {
      headers: this.getAuthHeaders()
    });
  }
}
