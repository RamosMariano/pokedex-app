import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  submitted: boolean = false;

  userService = inject(UserService);
  router = inject(Router);

  iniciarSesion() {
    this.submitted = true;

    if (!this.username || !this.password) {
      return;
    }

    const ok = this.userService.login(this.username, this.password);

    if (ok) {
      if (this.userService.esAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
}
  }
}
