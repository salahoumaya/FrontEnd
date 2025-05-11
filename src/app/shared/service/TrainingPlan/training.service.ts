import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private apiUrl = 'http://localhost:8076/public-training'; // URL du back-end

  constructor(private http: HttpClient) {}
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Token envoyé:', token);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ` Bearer ${token}`
  });}

  // Récupérer toutes les formations
  getAllTrainings(): Observable<any> {

    return this.http.get(`${this.apiUrl}/getAllTraining`, { headers: this.getAuthHeaders() });
  }


  // Récupérer une formation par ID
  getTrainingById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getTrainingById/${id}`);
  }

  addTraining(trainingData: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:8076/moderator/addTraining', trainingData, { headers });
  }


  updateTraining(trainingId: number, updatedTraining: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`http://localhost:8076/moderator/ModifyTrainingAndCourse/${trainingId}`, updatedTraining, { headers });
  }

  deleteTraining(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`http://localhost:8076/moderator/deleteTrainingWithCourses/${id}`, { headers });
  }


  getTrainingsForAuthenticatedTrainer(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>("http://localhost:8076/moderator/get-trainings", { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  createCourse(trainingId: number, courseData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`http://localhost:8076/moderator/course/${trainingId}`, courseData, { headers });
  }
  deleteCourse(courseId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`http://localhost:8076/moderator/training/${courseId}`, { headers });
  }
  getTrainingsForAuthenticatedSTUDENT(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>("http://localhost:8076/public-training/student/get-trainings", { headers });
  }
  subscribeToTraining(trainingId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`http://localhost:8076/public-training/subscribe/${trainingId}`, null,{ headers });
  }

  getDashboardData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`http://localhost:8076/moderator/get-dashboard`,{ headers });
  }

  register(userData: any): Observable<any> {
    return this.http.post(`http://localhost:8076/auth/register`, userData);
  }

  addPlanning(planning: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`http://localhost:8076/moderator/addPlanning/${planning.training.id}`, planning,{ headers })
}
}
