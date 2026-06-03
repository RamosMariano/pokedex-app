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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'myteam', component: MyteamComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotFoundComponent }
];