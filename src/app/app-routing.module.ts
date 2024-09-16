import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login.component';
import { loginGuard } from './login.guard';
import { UnauthorisedComponent } from './unauthorised.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'unauthorised', component: UnauthorisedComponent, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [loginGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
