import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Examen {
  id?: number;
  titre: string;
  note: number;
  examenT: 'ORAL' | 'ECRIT';
  session: 'PRINCIPALE' | 'CONTROLE';
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  submitUserAnswers(payload: any, userId: any, ex: any): Observable<any> {
    return this.http.post('http://localhost:8076/api/chatbot/answers/submit?userId=' + userId + '&ExamenId=' + ex, payload, {
      responseType: 'text'
    });
}

  
  addQuestionToExam(examId: number, question: any): Observable<any> {
    return this.http.post(`http://localhost:8076/api/chatbot/questions/${examId}`, question);
  }
  deleteQuestion(examId: number): Observable<any> {
    return this.http.delete(`http://localhost:8076/api/chatbot/questions/delete/${examId}`,{responseType:'text' as 'json'});
  }
  
  private apiUrl = 'http://localhost:8076/examens'; 

  constructor(private http: HttpClient) {}
  private getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const token = this.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  addAnswerToQuestion(questionId: number, answer: any): Observable<any> {
    return this.http.post(`http://localhost:8076/api/chatbot/answers/${questionId}`, answer);
  }
  
  assignUserToExamen(examenId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${examenId}/assign/${userId}`, {},{responseType:'text' as 'json', headers: this.getHeaders()});
  }
  calcul(examenId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${examenId}/calcul`, {},{responseType:'text' as 'json', headers: this.getHeaders()});
  }
  addnote(examenId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${examenId}/note/${userId}`, {},{responseType:'text' as 'json', headers: this.getHeaders()});
  }
    getAllexsuser(number:any): Observable<Examen[]> {
      return this.http.get<Examen[]>(this.apiUrl+"/buuser/"+number, { headers: this.getHeaders() });
    }
  getExamens(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl, { headers: this.getHeaders() });
  }
  getExamensbyfor(id:number): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl+"/byformation?id="+id, { headers: this.getHeaders() });
  }
  getExamFull(id: number): Observable<any> {
    return this.http.get(`http://localhost:8076/api/chatbot/questions/${id}/full`);
  }
  
  addExamen(examen: Examen, formationId: number): Observable<Examen> {
    return this.http.post<Examen>(`${this.apiUrl}/${formationId}`, examen, { headers: this.getHeaders() });
  }
  getmoyenne(formationId: number,id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${formationId}/${id}`, { headers: this.getHeaders() });
  }
  updateExamen(id: number, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/${id}`, examen, { headers: this.getHeaders() });
  }

  deleteExamen(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers: this.getHeaders(),responseType:'text' as 'json' });
  }

  participerExamen(examenId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${examenId}/participer/${userId}`, {}, { headers: this.getHeaders() });
  }

  getParticipants(examenId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${examenId}/participants`, { headers: this.getHeaders() });
  }
}
