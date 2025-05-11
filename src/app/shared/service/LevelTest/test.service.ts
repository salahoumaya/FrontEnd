import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class TestService {
  private baseUrl = 'http://localhost:8076/admin/tests';

  constructor(private http: HttpClient) {}
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Token envoyé:', token);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ` Bearer ${token}`
  });}
  getTests(): Observable<any[]> {

    return this.http.get<any[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  createTest(test: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, test,{headers: this.getAuthHeaders()});
  }
  updateTest(testId: number, updatedTest: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${testId}`, updatedTest, { headers: this.getAuthHeaders() });
  }




getTestById(testId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${testId}`, { headers: this.getAuthHeaders() });
}



deleteTest(testId: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${testId}`, { headers: this.getAuthHeaders() });
}


addQuestionToTest(testId: number, questionId: number): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/${testId}/questions/${questionId}`,
    {},
    { headers: this.getAuthHeaders() }
  );
}
getTestSubmissions(testId: number): Observable<any[]> {

  return this.http.get<any[]>(`${this.baseUrl}/${testId}/submissions`, {
    headers: this.getAuthHeaders()
  });
}
getTestStatistics(testId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${testId}/statistics`, {
    headers: this.getAuthHeaders()
  });
}





}
