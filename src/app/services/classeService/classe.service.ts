import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter une classe
  addClass(nomClasse: string, idEcole: string, idNiveau: string): Observable<any> {
    const params = new HttpParams()
      .set('nomClasse', nomClasse)
      .set('idEcole', idEcole)
      .set('idNiveau', idNiveau);

    const token = this.getToken(); // Récupérer le token

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`/api/addClass`, { headers, params }).pipe(
        catchError(this.handleError) // Gérer les erreurs d'API
      );
    } else {
      return throwError(() => new Error('Token non trouvé. Veuillez vous connecter.'));
    }
  }

  getAllClass(idEcole: string, idRole: string): Observable<any> {
    const params = new HttpParams()
      .set('idEcole', idEcole)
      .set('idRole', idRole);
  
    const token = this.getToken(); // Récupérer le token
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>('/api/getClasse', { headers, params }).pipe(
        catchError(this.handleError) // Gérer les erreurs d'API
      );
    } else {
      return throwError(() => new Error('Token non trouvé. Veuillez vous connecter.'));
    }
  }
  
  // Méthode pour récupérer le token depuis le localStorage
  private getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Méthode pour gérer les erreurs globalement
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError(() => new Error(error.message || 'Erreur du serveur'));
  }
}
