import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  usuario: any;
  ciudad = '';
  nombreVisible = '';
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const usuarioSesion = localStorage.getItem("pokeweb_sesion");
    if(usuarioSesion){
      this.usuario = JSON.parse(usuarioSesion);
      this.ciudad = this.usuario.ciudad || '';
      this.nombreVisible = this.usuario.nombreVisible || '';
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }
  
     guardarPerfil(): void{
      this.userService.actualizarPerfil({
      nombreVisible: this.nombreVisible,
      ciudad: this.ciudad
    });
    alert('Perfil actualizado');
     }
}
