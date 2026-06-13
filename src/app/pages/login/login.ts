import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  userService = inject(UserService);
  router = inject(Router);
  fb = inject(FormBuilder);

  formulario = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get username() { return this.formulario.get('username'); }
  get password() { return this.formulario.get('password'); }

  iniciarSesion() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return;

    const ok = this.userService.login(
      this.username!.value!,
      this.password!.value!
    );

    if (ok) {
      this.userService.esAdmin()
        ? this.router.navigate(['/admin'])
        : this.router.navigate(['/home']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Usuario o contraseña incorrectos',
        confirmButtonColor: '#e63946'
      });
    }
  }
}