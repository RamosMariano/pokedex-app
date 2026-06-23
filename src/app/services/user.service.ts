import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // ─── SESION (lee de kc_user seteado por Keycloak) ────────────

  getUsuarioActual(): User | null {
    const data = localStorage.getItem('kc_user');
    if (!data) return null;
    const kc = JSON.parse(data);
    return {
      username: kc.username,
      password: '',
      rol: kc.isAdmin ? 'admin' : 'usuario',
      nombreVisible: kc.nombreVisible || '',
      ciudad: kc.ciudad || ''
    };
  }

  estaLogueado(): boolean {
    return localStorage.getItem('kc_token') !== null;
  }

  esAdmin(): boolean {
    const data = localStorage.getItem('kc_user');
    if (!data) return false;
    return JSON.parse(data).isAdmin === true;
  }

  logout(): void {
    localStorage.removeItem('kc_token');
    localStorage.removeItem('kc_refresh_token');
    localStorage.removeItem('kc_user');
  }

  // ─── PERFIL ──────────────────────────────────────────────────

  actualizarPerfil(datos: { nombreVisible?: string; ciudad?: string; fotoPerfil?: string }): void {
    const data = localStorage.getItem('kc_user');
    if (!data) return;
    const kc = JSON.parse(data);
    const actualizado = { ...kc, ...datos };
    localStorage.setItem('kc_user', JSON.stringify(actualizado));
  }

  // ─── ADMIN ───────────────────────────────────────────────────
  // Con Keycloak no manejamos lista de usuarios en LocalStorage
  // Este método retorna vacío para no romper el AdminComponent

  getUsuarios(): User[] {
    return [];
  }
}