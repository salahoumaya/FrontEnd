import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Ensure the base URL is defined here
export interface Diplome {
  id: number;
  dateObtention: string;  
  formation: any;  
  user: any; 
  path:any
}

@Injectable({
  providedIn: 'root',
})
export class DiplomeService {
  private baseUrl = `http://localhost:8076/diplomes`; // Ensure that `environment.apiUrl` points to the correct API URL

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
  getAllDiplomes(): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(this.baseUrl,{ headers: this.getHeaders() });
  }

  getDiplomeById(id: number): Observable<Diplome> {
    return this.http.get<Diplome>(`${this.baseUrl}/${id}`,{ headers: this.getHeaders() });
  }

  createDiplome(diplome: any,idformation:number,iduser:number): Observable<Diplome> {
    return this.http.post<Diplome>(this.baseUrl+"?idformation="+idformation+"&iduser="+iduser, diplome,{ headers: this.getHeaders() });
  }

  updateDiplome(id: number, diplome: Diplome): Observable<Diplome> {
    return this.http.put<Diplome>(`${this.baseUrl}/${id}`, diplome,{ headers: this.getHeaders() });
  }

  deleteDiplome(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{ headers: this.getHeaders() });
  }

  generateDiploma(diplomaId: number, userId: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/generate/${diplomaId}/${userId}`,{ headers: this.getHeaders(),responseType:'text' as 'json' });
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8076/examens/users",{ headers: this.getHeaders() });
  }

}
