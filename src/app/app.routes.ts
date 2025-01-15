import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './composants/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransanctionComponent } from './pages/transanction/transanction.component';
import { PaiementsComponent } from './pages/paiements/paiements.component';
import { FacturesComponent } from './pages/factures/factures.component';
import { EcolesComponent } from './pages/ecoles/ecoles.component';
import { GestionElevesComponent } from './pages/gestion-eleves/gestion-eleves.component';
import { ParentsComponent } from './pages/parents/parents.component';
import { CommunicationComponent } from './pages/communication/communication.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { ParametreComponent } from './pages/parametre/parametre.component';
import { AuthGuard } from '../app/services/guard/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route
      },
      {
        path: 'transanction',
        component: TransanctionComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'paiements',
        component: PaiementsComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'factures',
        component: FacturesComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'ecole',
        component: EcolesComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'eleve',
        component: GestionElevesComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'parent',
        component: ParentsComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'communication',
        component: CommunicationComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'utilisateur',
        component: UtilisateursComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'parametre',
        component: ParametreComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
