import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8076/user/reclamations';


  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/mark-as-read`, {}, { headers: this.getAuthHeaders() });
}




  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

// reclamation.service.ts
createReclamation(reclamationData: any): Observable<any> {


  return this.http.post(this.baseUrl, reclamationData ,{ headers: this.getAuthHeaders() });
}

  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  getMyReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my`, { headers: this.getAuthHeaders() });
}



getEvents() {
  return this.http.get<any[]>(`${this.baseUrl}/events`, { headers: this.getAuthHeaders() });
}

getTrainings() {
  return this.http.get<any[]>(`${this.baseUrl}/trainings`, { headers: this.getAuthHeaders() });
}

getAllSujets() {
  return this.http.get<any[]>(`${this.baseUrl}/sujets-pfe`, { headers: this.getAuthHeaders() });
}

}
