import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  router = inject(Router);
  fb = inject(FormBuilder);

  formulario = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmar: ['', Validators.required]
  });

  get username() { return this.formulario.get('username'); }
  get password() { return this.formulario.get('password'); }
  get confirmar() { return this.formulario.get('confirmar'); }

  get passwordsDistintas() {
    return this.password?.value !== this.confirmar?.value;
  }

  registrar() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return;

    if (this.passwordsDistintas) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden', confirmButtonColor: '#e63946' });
      return;
    }

    // el registro se gestiona desde Keycloack
    const registerUrl = `https://auth.fabriq.uy/realms/pokedex/protocol/openid-connect/registrations`
      + `?client_id=pokedex-app`
      + `&response_type=code`
      + `&scope=openid`
      + `&redirect_uri=${encodeURIComponent(window.location.origin + '/login')}`;

    window.location.href = registerUrl;
  }
}