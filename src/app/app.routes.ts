import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { DetailComponent } from './pages/detail/detail';
import { FavoritesComponent } from './pages/favorites/favorites';
import { MyteamComponent } from './pages/myteam/myteam';
import { ProfileComponent } from './pages/profile/profile';
import { ResourcesComponent } from './pages/resources/resources';
import { AdminComponent } from './pages/admin/admin';
import { NotFoundComponent } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login',      component: LoginComponent },
  { path: 'register',   component: RegisterComponent },
  { path: 'home',       component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent},
  { path: 'favorites',  component: FavoritesComponent, canActivate: [authGuard] },
  { path: 'myteam',     component: MyteamComponent,    canActivate: [authGuard] },
  { path: 'profile',    component: ProfileComponent,   canActivate: [authGuard] },
  { path: 'resources',  component: ResourcesComponent, canActivate: [authGuard] },
  { path: 'admin',      component: AdminComponent,     canActivate: [adminGuard] },
  { path: '**',         component: NotFoundComponent }
];