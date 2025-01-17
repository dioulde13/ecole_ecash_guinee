import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {
 constructor(private http: HttpClient) {}


  // Récupérer la liste des utilisateurs
  getAllNiveau(): Observable<any> {
    const token = this.getToken(); // Récupérer le token
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`/api/getListeNiveau`, { headers }).pipe(
        catchError(this.handleError) // Gérer les erreurs d'API
      );
    }
    return throwError(() => new Error('No token found')); // Retourner une erreur si le token n'existe pas
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
