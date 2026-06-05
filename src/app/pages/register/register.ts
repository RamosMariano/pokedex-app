import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  confirmar: string = '';
  submitted: boolean = false;

  userService = inject(UserService);
  router = inject(Router);

  registrar() {
    this.submitted = true;

    if (!this.username || !this.password || !this.confirmar) {
      return;
    }

    if (this.password !== this.confirmar) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonColor: '#e63946'
      });
      return;
    }

    if (this.username === 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ese nombre de usuario no está disponible',
        confirmButtonColor: '#e63946'
      });
      return;
    }

    const ok = this.userService.registrar(this.username, this.password);

    if (ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: 'Ya podés iniciar sesión',
        confirmButtonColor: '#e63946'
      }).then(() => {
        this.router.navigate(['/login']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ese nombre de usuario ya existe',
        confirmButtonColor: '#e63946'
      });
    }
  }
}