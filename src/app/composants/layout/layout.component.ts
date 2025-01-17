import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { Router } from '@angular/router';
import { RouterLink} from '@angular/router';



@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  userInfo: any = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer les informations de l'utilisateur connecté
    this.userInfo = this.authService.getUserInfo();
    console.log('Informations utilisateur:', this.userInfo);
  }
  
  menus = [
    { id: 'dashboard', label: 'Tableau De Bord', link: '/dashboard', icon: 'bi bi-grid' },
    { id: 'transactions', label: 'Transactions', link: '/transactions', icon: 'bi bi-file-text' },
    { id: 'payments', label: 'Paiements', link: '/payments', icon: 'bi bi-credit-card' },
    { id: 'invoices', label: 'Factures', link: '/invoices', icon: 'bi bi-file-earmark-text' },
    { id: 'schools', label: 'Ecoles', link: '/schools', icon: 'bi bi-building' },
    { id: 'students', label: 'Gestion Élèves', link: '/students', icon: 'bi bi-people' },
    { id: 'parents', label: 'Parents', link: '/parents', icon: 'bi bi-person-lines-fill' },
    { id: 'communications', label: 'Communications', link: '/communications', icon: 'bi bi-chat-dots' },
    { id: 'users', label: 'Utilisateurs', link: '/users', icon: 'bi bi-person' },
    { id: 'settings', label: 'Paramètres', link: '/settings', icon: 'bi bi-gear' },
];


  isSidebarOpen = false; // État initial de la barre latérale
  activeMenu = 'dashboard'; // Menu actif par défaut

  selectMenu(menuId: string) {
    this.activeMenu = menuId;
    this.closeSideBar(); // Fermer la sidebar après la sélection sur mobile
}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSideBar() {
    this.isSidebarOpen = false;
  }

  isDropdownOpen = false;


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  toggleSidenav() {
    // this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Rediriger vers la page de login après déconnexion
  }
  
}
