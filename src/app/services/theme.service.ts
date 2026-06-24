import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private THEME_KEY = 'pokeweb_tema';

  // ─── ACTIVAR / DESACTIVAR ──────────────────────────────

  activarModoOscuro(): void {
    document.body.classList.add('modo-oscuro');
    localStorage.setItem(this.THEME_KEY, 'oscuro');
  }

  desactivarModoOscuro(): void {
    document.body.classList.remove('modo-oscuro');
    localStorage.setItem(this.THEME_KEY, 'claro');
  }

  // ─── CONSULTA Y TOGGLE ──────────────────────────────────

  esModoOscuro(): boolean {
    return localStorage.getItem(this.THEME_KEY) === 'oscuro';
  }

  toggleModoOscuro(): void {
    if (this.esModoOscuro()) {
      this.desactivarModoOscuro();
    } else {
      this.activarModoOscuro();
    }
  }

  // ─── INICIALIZAR AL ARRANCAR LA APP ────────────────────

  aplicarTemaGuardado(): void {
    if (this.esModoOscuro()) {
      document.body.classList.add('modo-oscuro');
    }
  }
}