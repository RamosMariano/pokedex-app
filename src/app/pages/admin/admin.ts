import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {

  usuarios: User[] = [];
  userService = inject(UserService);
  router = inject(Router);

  ngOnInit() {
    this.usuarios = this.userService.getUsuarios();
  }

  cerrarSesion() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
