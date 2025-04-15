import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export class Formation {
  id!: number;
  titre!: string;
  description!: string;
  niveau!: number;
  formationT!:string 
  
}


@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8076'; // L'URL de votre backend

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

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl+"/public-training/getAllTraining", { headers: this.getHeaders() });
  }
  getAllFormationsuser(number:any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/buuser/"+number, { headers: this.getHeaders() });
  }
  getAllCouresebyformation(number:any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/public-training/training/"+number+"/courses", { headers: this.getHeaders() });
  }
  getAllCourese(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/moderator/allcourses", { headers: this.getHeaders() });
  }
  assignUserToFormation(formationId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${formationId}/assign/${userId}`, {},{headers: this.getHeaders(),responseType:'text' as 'json'});
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formation, { headers: this.getHeaders() });
  }

  updateFormation(id: number, formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/${id}`, formation, { headers: this.getHeaders() });
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
