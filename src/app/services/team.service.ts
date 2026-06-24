import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { TeamPokemon } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private userService = inject(UserService);
  private MAX_EQUIPO = 6;

  // ─── CLAVE ───────────────────────────────────────────

  private getKey(): string | null {
    const usuario = this.userService.getUsuarioActual();
    if (!usuario) return null;
    return `pokeweb_equipo_${usuario.username}`;
  }

  // ─── OBTENER EQUIPO ─────────────────────────────────────────

  getEquipo(): TeamPokemon[] {
    const key = this.getKey();
    if (!key) return [];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // ─── AGREGAR ───────────────────────────────────

  agregar(pokemon: TeamPokemon): boolean {
    const key = this.getKey();
    if (!key) return false;

    const equipo = this.getEquipo();

    if (equipo.length >= this.MAX_EQUIPO) {
      return false;
    }

    const yaEsta = equipo.find(p => p.id === pokemon.id);
    if (yaEsta) return false;

    equipo.push(pokemon);
    localStorage.setItem(key, JSON.stringify(equipo));
    return true;
  }

  // ─── ELIMINAR ────────────────────────

  eliminar(id: number): void {
    const key = this.getKey();
    if (!key) return;

    const equipo = this.getEquipo().filter(p => p.id !== id);
    localStorage.setItem(key, JSON.stringify(equipo));
  }

  // ─── CONSULTAS ────────────────────────────

  estaEnEquipo(id: number): boolean {
    return this.getEquipo().some(p => p.id === id);
  }

  cantidadEquipo(): number {
    return this.getEquipo().length;
  }
}
