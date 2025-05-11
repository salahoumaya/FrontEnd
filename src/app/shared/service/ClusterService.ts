// src/app/shared/service/clustering/clustering.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClusteringService {
  private apiUrl = 'http://localhost:8076/admin/clustering/users';

    constructor(private http: HttpClient) {}
    private getAuthHeaders() {
      const token = localStorage.getItem('token');
      console.log('Token envoyé:', token);

      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ` Bearer ${token}`
    });}



  getClusterUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl,{ headers: this.getAuthHeaders() });
  }
}
