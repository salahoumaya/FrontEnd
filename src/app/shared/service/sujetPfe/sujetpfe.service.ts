import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {SujetPfe} from 'src/app/models/sujetpfe';
import {OurUsers} from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class SujetPfeService {

  private baseUrl: string = 'http://localhost:8076/api/sujets';


  constructor(private http: HttpClient) {}
      private getAuthHeaders() {
        const token = localStorage.getItem('token');
        console.log('Token envoyé:', token);

        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${token}`
      });}


  // Ajouter un sujet
  ajouterSujet(sujetPfe: SujetPfe): Observable<SujetPfe> {
    return this.http.post<SujetPfe>(`${this.baseUrl}/admin`, sujetPfe,{ headers: this.getAuthHeaders() });
  }

  // Récupérer tous les sujets
  getAllSujets(): Observable<SujetPfe[]> {
    return this.http.get<SujetPfe[]>(this.baseUrl,{ headers: this.getAuthHeaders() });
  }

  // Récupérer un sujet par ID
  getSujetById(id: number): Observable<SujetPfe> {
    return this.http.get<SujetPfe>(`${this.baseUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }

  // Modifier un sujet
  modifierSujet(id: number, updatedSujet: SujetPfe): Observable<SujetPfe> {
    return this.http.put<SujetPfe>(`${this.baseUrl}/${id}`, updatedSujet,{ headers: this.getAuthHeaders() });
  }

  // Supprimer un sujet
  supprimerSujet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }

  // Affecter un modérateur à un sujet
  affecterModerateur(sujetPfeId: number, moderatorId: number): Observable<SujetPfe> {
    return this.http.put<SujetPfe>(`${this.baseUrl}/affecterModerateur/${sujetPfeId}/${moderatorId}`, {},{ headers: this.getAuthHeaders() });
  }

  // Postuler pour un sujet
  postulerSujetPfe(sujetPfeId: number, userId: number): Observable<SujetPfe> {
    return this.http.post<SujetPfe>(`${this.baseUrl}/user/postuler/${sujetPfeId}/${userId}`, {},{ headers: this.getAuthHeaders() });
  }
couldPostulate(userId: number): Observable<boolean> {
  return this.http.get<boolean>(
    `${this.baseUrl}/user/could-postulate/${userId}`,
    { headers: this.getAuthHeaders() }
  );
}

  // Accepter une postulation
  accepterPostulation(sujetPfeId: number, userId: number): Observable<SujetPfe> {
    return this.http.put<SujetPfe>(`${this.baseUrl}/accepter/${sujetPfeId}/${userId}`, {},{ headers: this.getAuthHeaders() });
  }

  // Refuser une postulation
  refuserPostulation(sujetPfeId: number, userId: number): Observable<SujetPfe> {
    return this.http.put<SujetPfe>(`${this.baseUrl}/refuser/${sujetPfeId}/${userId}`, {},{ headers: this.getAuthHeaders() });
  }

  // Récupérer les demandeurs pour un sujet
  getDemandeurs(sujetPfeId: number): Observable<OurUsers[]> {
    return this.http.get<OurUsers[]>(`${this.baseUrl}/demandeurs/${sujetPfeId}`,{ headers: this.getAuthHeaders() });
  }

  getProjetsAffectes(userId: number): Observable<SujetPfe[]> {
    return this.http.get<SujetPfe[]>(`${this.baseUrl}/projets-affectes/${userId}`,{ headers: this.getAuthHeaders() });
  }

  getProjetsPostules(userId: number): Observable<SujetPfe[]> {
    return this.http.get<SujetPfe[]>(`${this.baseUrl}/projets-postules/${userId}`,{ headers: this.getAuthHeaders() });
  }

  getSujetsNonPostules(userId: number): Observable<SujetPfe[]> {
    return this.http.get<SujetPfe[]>(`${this.baseUrl}/sujets-non-postules/${userId}`,{ headers: this.getAuthHeaders() });
  }

  uploadRapport(sujetPfeId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/${sujetPfeId}/upload`, formData,{ headers: this.getAuthHeaders() });
  }

  getSujetsByModerator(moderatorId: number): Observable<SujetPfe[]> {
    return this.http.get<SujetPfe[]>(`${this.baseUrl}/moderateur/${moderatorId}`,{ headers: this.getAuthHeaders() });
  }

  getPourcentageSujetsAttribues(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/pourcentage-attribues`,{ headers: this.getAuthHeaders() });
  }

  getStudentAffectedToPfe(pfeId: number): Observable<OurUsers> {
    return this.http.get<OurUsers>(`${this.baseUrl}/student-affected-to-subjet/${pfeId}`,{ headers: this.getAuthHeaders() });

  }


}
