import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',           redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',      loadComponent: () => import('./pages/login/login').then(c => c.LoginComponent) },
  { path: 'register',   loadComponent: () => import('./pages/register/register').then(c => c.RegisterComponent) },
  { path: 'home',       loadComponent: () => import('./pages/home/home').then(c => c.HomeComponent) },
  { path: 'detail/:id', loadComponent: () => import('./pages/detail/detail').then(c => c.DetailComponent) },
  { path: 'favorites',  loadComponent: () => import('./pages/favorites/favorites').then(c => c.FavoritesComponent) },
  { path: 'myteam',     loadComponent: () => import('./pages/myteam/myteam').then(c => c.MyteamComponent) },
  { path: 'profile',    loadComponent: () => import('./pages/profile/profile').then(c => c.ProfileComponent) },
  { path: 'resources',  loadComponent: () => import('./pages/resources/resources').then(c => c.ResourcesComponent) },
  { path: 'admin',      loadComponent: () => import('./pages/admin/admin').then(c => c.AdminComponent) },
  { path: '**',         loadComponent: () => import('./pages/not-found/not-found').then(c => c.NotFoundComponent) }
];