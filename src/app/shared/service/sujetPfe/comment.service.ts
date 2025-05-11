import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import  {Comment} from "../../../models/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8076/api/comments';
 constructor(private http: HttpClient) {}
      private getAuthHeaders() {
        const token = localStorage.getItem('token');
        console.log('Token envoyé:', token);

        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${token}`
      });}

  getComments(internshipId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/getAll/${internshipId}`,{ headers: this.getAuthHeaders() });
  }

  postComment(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/add`, formData,{ headers: this.getAuthHeaders() });
  }
  searchComments(keyword: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/search?keyword=${keyword}`,{ headers: this.getAuthHeaders() });
  }




}

