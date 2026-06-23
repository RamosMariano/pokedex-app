import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from '../../services/keycloak.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  keycloakService = inject(KeycloakService);
  router = inject(Router);
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  formulario = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get username() { return this.formulario.get('username'); }
  get password() { return this.formulario.get('password'); }

  iniciarSesion() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return;

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'pokedex-app');
    body.set('username', this.username!.value!);
    body.set('password', this.password!.value!);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const url = 'https://auth.fabriq.uy/realms/pokedex/protocol/openid-connect/token';

    this.http.post<any>(url, body.toString(), { headers }).subscribe({
      next: (res) => {
  console.log('Token recibido:', res.access_token);
  localStorage.setItem('kc_token', res.access_token);
  localStorage.setItem('kc_refresh_token', res.refresh_token);

  const payload = JSON.parse(atob(res.access_token.split('.')[1]));
  console.log('Payload:', payload);

  const roles: string[] = payload.resource_access?.['pokedex-app']?.roles ?? [];
  const isAdmin = roles.includes('admin');

  localStorage.setItem('kc_user', JSON.stringify({
    username: payload.preferred_username,
    userId: payload.sub,
    isAdmin: isAdmin
  }));

  console.log('isAdmin:', isAdmin, '— navegando...');

  Swal.fire({
    icon: 'success',
    title: `¡Bienvenido, ${payload.preferred_username}!`,
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    isAdmin
      ? this.router.navigate(['/admin'])
      : this.router.navigate(['/home']);
  });
},
error: (err) => {
  console.log('Error:', err);
  Swal.fire({
    icon: 'error',
    title: 'Error al iniciar sesión',
    text: 'Usuario o contraseña incorrectos',
    confirmButtonColor: '#e63946'
  });
}
    });
  }
}