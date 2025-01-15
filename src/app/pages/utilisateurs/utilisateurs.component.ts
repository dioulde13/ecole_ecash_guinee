import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { CommonModule } from '@angular/common';  // Importer CommonModule


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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUtilisateurs(); // Charger les utilisateurs au démarrage
  }

  fetchUtilisateurs(): void {
    this.authService.getAllUsers().subscribe(
      (response) => {
        this.utilisateurs = response.data; // Assignez les données reçues à la liste
        console.log(this.utilisateurs);
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Erreur lors de la récupération des utilisateurs.';
      }
    );
  }
}


