import { NgModule } from '@angular/core';
import { Routes ,RouterModule} from '@angular/router';
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
import { ClasseComponent } from './pages/classes/classe.component';


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
        path: 'dashboards',
        component: DashboardComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route
      },
      {
        path: 'transanctions',
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
        path: 'ecoles',
        component: EcolesComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'classes',
        component: ClasseComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'eleves',
        component: GestionElevesComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'parents',
        component: ParentsComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'communications',
        component: CommunicationComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [AuthGuard], // Appliquer le garde sur cette route

      },
      {
        path: 'parametres',
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
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
