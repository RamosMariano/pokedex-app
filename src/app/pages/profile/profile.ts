import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FavoritesService } from '../../services/favorites.service';
import { TeamService } from '../../services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {

  usuario: any = null;
  nombreVisible = '';
  ciudad = '';
  editando = false;
  pestanaActiva = 'favoritos';
  favoritos: any[] = [];
  equipo: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private favoritesService: FavoritesService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    const usuarioSesion = localStorage.getItem('pokeweb_sesion');
    if (usuarioSesion) {
      this.usuario = JSON.parse(usuarioSesion);
      this.nombreVisible = this.usuario.nombreVisible || '';
      this.ciudad = this.usuario.ciudad || '';
    } else {
      this.router.navigate(['/login']);
      return;
    }
    this.favoritos = this.favoritesService.obtenerPokeFavoritos();
    this.equipo = this.teamService.getEquipo();
  }

  guardarPerfil(): void {
    this.userService.actualizarPerfil({
      nombreVisible: this.nombreVisible,
      ciudad: this.ciudad
    });
    this.usuario.nombreVisible = this.nombreVisible;
    this.usuario.ciudad = this.ciudad;
    this.editando = false;
    Swal.fire({
      icon: 'success',
      title: '¡Perfil actualizado!',
      timer: 1500,
      showConfirmButton: false
    });
  }

  cerrarSesion(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}