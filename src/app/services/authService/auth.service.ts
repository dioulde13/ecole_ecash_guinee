import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo: any = null;  // Stocke les informations de l'utilisateur

  constructor(private http: HttpClient) {}

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get(`/api/login`, { params }).pipe(
      catchError(this.handleError), // Gérer les erreurs d'API
      tap((response: any) => {
        // Supposons que la réponse contient le token, vous pouvez l'enregistrer ici
        if (response.token) {
          this.saveToken(response.token); // Sauvegarder le token dans le localStorage
        }
      })
    );
  }

  // Sauvegarder les informations de l'utilisateur après connexion
  setUserInfo(userInfo: any): void {
    console.log('User Info:', userInfo);
    this.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Optionnel : sauvegarder dans localStorage
  }

  // Récupérer les informations de l'utilisateur connecté
  getUserInfo(): any {
    if (this.userInfo) {
      console.log('Returning cached user info:', this.userInfo);
      return this.userInfo;
    } else if (typeof window !== 'undefined' && window.localStorage) {
      // Charger depuis localStorage si les informations ne sont pas en mémoire
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        this.userInfo = JSON.parse(storedUserInfo);
        console.log('Returning user info from localStorage:', this.userInfo);
        return this.userInfo;
      }
    }
    return null;
  }

  // Vérification si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; // Pas de token, donc non authentifié
    }

    const expiry = this.getTokenExpiry(token);
    if (expiry === null) {
      return false; // Si l'expiration est null, l'utilisateur n'est pas authentifié
    }
    return expiry > Date.now(); // Vérifie si le token est encore valide
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
      localStorage.removeItem('userInfo');
      this.userInfo = null;
    }
  }

  // Récupérer la liste des utilisateurs
  getAllUsers(): Observable<any> {
    const token = this.getToken(); // Récupérer le token
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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

  // Fonction pour récupérer l'expiration du token
  private getTokenExpiry(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload du JWT
      return payload.exp ? payload.exp * 1000 : null; // L'expiration est en secondes
    } catch (e) {
      return null; // Token invalide
    }
  }
}
