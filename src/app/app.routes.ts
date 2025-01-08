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
      },
      {
        path: 'transanction',
        component: TransanctionComponent,
      },
      {
        path: 'paiements',
        component: PaiementsComponent,
      },
      {
        path: 'factures',
        component: FacturesComponent,
      },
      {
        path: 'ecole',
        component: EcolesComponent,
      },
      {
        path: 'eleve',
        component: GestionElevesComponent,
      },
      {
        path: 'parent',
        component: ParentsComponent,
      },
      {
        path: 'communication',
        component: CommunicationComponent,
      },
      {
        path: 'utilisateur',
        component: UtilisateursComponent,
      },
      {
        path: 'parametre',
        component: ParametreComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
