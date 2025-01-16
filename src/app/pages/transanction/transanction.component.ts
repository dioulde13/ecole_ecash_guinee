import { Component } from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-transanction',
  imports: [],
  templateUrl: './transanction.component.html',
  styleUrl: './transanction.component.css'
})
export class TransanctionComponent {
  userInfo: any = null;

  constructor(private infosUser: AuthService) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur connecté
    this.userInfo = this.infosUser.getUserInfo();
    console.log('Informations utilisateur:', this.userInfo);
  }
}
