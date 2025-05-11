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


  getTests(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }


  getTestById(testId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${testId}`, { headers: this.getAuthHeaders() });
  }


  submitTest(submissionData: any): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/submit`, submissionData, {
      headers: this.getAuthHeaders()
    });
  }


  getTestResult(testId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${testId}/result`, {
      headers: this.getAuthHeaders()
    });
  }

  explainAnswer(question: string, userAnswer: string, correctAnswer: string): Observable<any> {
    const body = {
      question,
      user_answer: userAnswer,
      correct_answer: correctAnswer
    };

    return this.http.post<any>(`${this.baseUrl}/test/explain`, body, {
      headers: this.getAuthHeaders()
    });
  }



  getRecommendationFromLastScore(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/recommend`, {
      headers: this.getAuthHeaders()
    });
  }
  



}
