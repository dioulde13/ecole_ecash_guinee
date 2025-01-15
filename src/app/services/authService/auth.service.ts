import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(msisdn: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('msisdn', msisdn)
      .set('password', password);

    return this.http.get(`/api/login`, { params }).pipe(
      catchError(this.handleError) // Gérer les erreurs d'API
    );
  }

  // Vérification si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Sauvegarder le token dans le stockage local
  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }

  // Récupérer le token du stockage local
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }

  // Récupérer la liste des utilisateurs
  getAllUsers(): Observable<any> {
    const token = this.getToken(); // Récupérer le token
    console.log(token);
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log(headers);
      return this.http.get(`/api/getListesUtilisateur`, { headers }).pipe(
        catchError(this.handleError) // Gérer les erreurs d'API
      );
    }
    return throwError(() => new Error('No token found')); // Retourner une erreur si le token n'existe pas
  }

  // Gérer les erreurs globalement
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue :', error);
    return throwError(() => new Error(error.message || 'Erreur du serveur'));
  }
}
