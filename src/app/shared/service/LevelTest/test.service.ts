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
    const token = localStorage.getItem('token'); // 🔥 Vérifie si le token est bien récupéré
    console.log('Token envoyé:', token); // ✅ Affiche le token dans la console

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


  // ✅ Récupérer un test par ID
getTestById(testId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/${testId}`, { headers: this.getAuthHeaders() });
}


// ✅ Supprimer un test
deleteTest(testId: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${testId}`, { headers: this.getAuthHeaders() });
}

// ✅ Ajouter une question à un test
addQuestionToTest(testId: number, questionId: number): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/${testId}/questions/${questionId}`,
    {},  // Le body est vide car ce sont des IDs en URL
    { headers: this.getAuthHeaders() }
  );
}
// ✅ Soumettre les réponses d'un test et récupérer le score
submitTest(submissionData: any): Observable<number> {
  return this.http.post<number>(`${this.baseUrl}/submit`, submissionData, {
    headers: this.getAuthHeaders()
  });
  }

}
