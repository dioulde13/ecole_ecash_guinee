import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parametre.component.html',
  styleUrl: './parametre.component.css'
})
export class ParametreComponent implements OnInit{

  userInfo: any = null;

  constructor(private infosUser: AuthService) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur connecté
    this.userInfo = this.infosUser.getUserInfo();
    console.log('Informations utilisateur:', this.userInfo);
  }

}
