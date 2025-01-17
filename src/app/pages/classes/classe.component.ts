import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../services/classeService/classe.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/authService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NiveauService } from '../../services/niveauService/niveau.service';

@Component({
  selector: 'app-classe',
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './classe.component.html', 
  styleUrls: ['./classe.component.css'] 
})
export class ClasseComponent implements OnInit {
  schoolID: string = ''; 
  idRole: string = ''; 
  nomClasse: string = ''; 
  idNiveau: string = ''; 
  userInfo: any = null; 
  allNiveau: any[] = []; 
  allClasse: any[] = []; 
  loading: boolean = false; // Indicateur de chargement

  constructor(
    private classeService: ClasseService, 
    private authService: AuthService, 
    private niveauService: NiveauService, 
    private snackBar: MatSnackBar 
  ) {}

  showNotification(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar',
    });
  }
  

  ngOnInit(): void {
    this.fetchNiveau();
    this.userInfo = this.authService.getUserInfo();
    if (this.userInfo) {
      this.idRole = this.userInfo.role_id;
      this.schoolID = this.userInfo.schoolID;
      this.listAllClass();
    } else {
      console.error('Erreur : utilisateur non connecté.');
    }
  }
  
  fetchNiveau(): void {
    this.niveauService.getAllNiveau().subscribe(
      (response) => {
        this.allNiveau = response.data;
        console.log(this.allNiveau);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  listAllClass(): void {
    if (this.idRole) {
      // this.loading = true;
      this.classeService.getAllClass(this.schoolID, this.idRole).subscribe({
        next: (response) => {
          // this.loading = false;
          if (response && response.data) {
            this.allClasse = response.data;
            console.log('Classes récupérées :', this.allClasse);
          } else {
            this.showNotification('Aucune classe disponible.');
          }
        },
        error: (error) => {
          // this.loading = false;
          this.showNotification('Erreur lors de la récupération des classes.');
          console.error('Erreur:', error);
        }
      });
    } else {
      this.showNotification('Veuillez remplir tous les champs.');
    }
  }

  onAddClass(): void {
    if (this.nomClasse && this.schoolID && this.idNiveau) {
      this.loading = true;
      this.classeService.addClass(this.nomClasse, this.schoolID, this.idNiveau).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.status === 404) {
            this.showNotification('Cette classe existe déjà dans ce niveau.');
          } else {
            this.showNotification('Classe ajoutée avec succès !');
            this.listAllClass();
          }
        },
        error: (error) => {
          this.loading = false;
          this.showNotification('Erreur lors de l\'ajout de la classe.');
          console.error('Erreur:', error);
        }
      });
    } else {
      this.showNotification('Veuillez remplir tous les champs.');
    }
  }
}
