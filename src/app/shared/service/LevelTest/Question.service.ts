import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://localhost:8076/admin/questions';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Token envoyé:', token);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Get all questions
  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // ✅ Create a new question & assign it to a test
  createQuestion(testId: number, question: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${testId}`, question, { headers: this.getAuthHeaders() });
  }
}
