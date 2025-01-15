import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importer FormsModule
import { CommonModule } from '@angular/common';  // Importer CommonModule


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  msisdn = '';
  password = '';
  errorMessage = '';
  isLoading: boolean = false;
  

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.isLoading = true; // Activer l'indicateur de chargement
    this.authService.login(this.msisdn, this.password).subscribe({
      next: (response) => {
        if (response && response.data && response.data.token) {
          this.authService.saveToken(response.data.token);
          console.log(response);
          this.router.navigate(['/dashboard']); // Redirection après connexion
        } else {
          // Gestion si le token est manquant dans la réponse
          this.errorMessage = 'Utilisateur non trouvé. Veuillez saisir les informations correctes.';
          console.log(this.errorMessage);
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false; // Désactiver l'indicateur de chargement
  
        // Vérification de l'objet `err` pour éviter les erreurs non définies
        if (err && err.status === 404) {
          this.errorMessage = 'Utilisateur non trouvé. Veuillez vérifier vos informations.';
        } else if (err && err.message) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Une erreur inattendue est survenue.';
        }
  
        console.error(err); // Affiche l'erreur complète dans la console pour le débogage
      },
      complete: () => {
        this.isLoading = false; // S'assurer de désactiver le chargement une fois l'appel terminé
      }
    });
  }
    

}
