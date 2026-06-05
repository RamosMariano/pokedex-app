import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS_KEY = 'pokeweb_usuarios';
  private SESSION_KEY = 'pokeweb_sesion';

  // ─── REGISTRO ───────────────────────────────────────────────

  registrar(username: string, password: string): boolean {
    const usuarios = this.getUsuarios();
    const existe = usuarios.find(u => u.username === username);
    if (existe) return false;
    const nuevoUsuario: User = { username, password, rol: 'usuario' };
    usuarios.push(nuevoUsuario);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(usuarios));
    return true;
  }

  // ─── LOGIN ──────────────────────────────────────────────────

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin1234') {
      const adminUser: User = { username: 'admin', password: 'admin1234', rol: 'admin' };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(adminUser));
      return true;
    }
    const usuarios = this.getUsuarios();
    const user = usuarios.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  // ─── SESION ──────────────────────────────────────────────────

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  getUsuarioActual(): User | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  estaLogueado(): boolean {
    return this.getUsuarioActual() !== null;
  }

  esAdmin(): boolean {
    return this.getUsuarioActual()?.rol === 'admin';
  }

  // ─── PERFIL ──────────────────────────────────────────────────

  actualizarPerfil(datos: { nombreVisible?: string; ciudad?: string; fotoPerfil?: string }): void {
    const usuarioActual = this.getUsuarioActual();
    if (!usuarioActual) return;
    const usuarioActualizado: User = { ...usuarioActual, ...datos };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(usuarioActualizado));
    if (usuarioActual.rol !== 'admin') {
      const usuarios = this.getUsuarios();
      const indice = usuarios.findIndex(u => u.username === usuarioActual.username);
      if (indice !== -1) {
        usuarios[indice] = usuarioActualizado;
        localStorage.setItem(this.USERS_KEY, JSON.stringify(usuarios));
      }
    }
  }

  // ─── ADMIN ───────────────────────────────────────────────────

  getUsuarios(): User[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }
}