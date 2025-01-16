import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: any[] = []; // Liste des utilisateurs
  errorMessage: string | null = null; // Message d'erreur
  isLoading: boolean = true; // État de chargement

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.fetchUtilisateurs(); // Charger les utilisateurs au démarrage
  }

  fetchUtilisateurs(): void {
    this.isLoading = true; // Activer l'état de chargement
    this.authService.getAllUsers().subscribe(
      (response) => {
        this.utilisateurs = response.data; // Assigner les utilisateurs
        console.log(this.utilisateurs);
        console.log(this.utilisateurs.length);
        this.isLoading = false; // Désactiver le chargement
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Erreur lors de la récupération des utilisateurs.';
        this.isLoading = false; // Désactiver le chargement même en cas d'erreur
      }
    );
  }
}
