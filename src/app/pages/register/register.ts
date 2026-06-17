import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  userService = inject(UserService);
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

  registrar() {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return;

    if (this.password!.value !== this.confirmar!.value) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden', confirmButtonColor: '#e63946' });
      return;
    }

    if (this.username!.value === 'admin') {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Ese nombre de usuario no está disponible', confirmButtonColor: '#e63946' });
      return;
    }

    const ok = this.userService.registrar(this.username!.value!, this.password!.value!);

    if (ok) {
      Swal.fire({ icon: 'success', title: '¡Cuenta creada!', text: 'Ya podés iniciar sesión', confirmButtonColor: '#e63946' })
        .then(() => this.router.navigate(['/login']));
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Ese nombre de usuario ya existe', confirmButtonColor: '#e63946' });
    }
  }

  get passwordsDistintas()
  {
    return this.password?.value !== this.confirmar?.value;
  }

}