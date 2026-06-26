import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak!: Keycloak;

  async init(): Promise<boolean> {
    this.keycloak = new Keycloak({
      url: 'https://auth.fabriq.uy/',
      realm: 'pokedex',
      clientId: 'pokedex-app'
    });

    return this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });
  }

  isLoggedIn(): boolean {
    return !!this.keycloak?.authenticated;
  }

  getUsername(): string | undefined {
    return this.keycloak?.tokenParsed?.['preferred_username'];
  }

  getUserId(): string | undefined {
    return this.keycloak?.tokenParsed?.['sub'];
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }

  isAdmin(): boolean {
    return this.keycloak?.hasResourceRole('admin', 'pokedex-app') ?? false;
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin });
  }
}