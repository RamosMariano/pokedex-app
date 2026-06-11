import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent 
{
  //logueado = false; //para evitar mostrar otros links si no hay sesion

  userService = inject(UserService);
  router = inject(Router);
  profileImg = this.asignarImagenLocalStorage();

  selectorRuta() //te manda al login si no estas logueado.
  {
    if (this.logueado()) 
    {
      return "/home";
    }

    return "/login";
  }

  logueado():boolean{
    if(this.userService.estaLogueado()){
      return true
    }

    return false;
  }

  stockImg()
  {
    this.profileImg = "/assets/img/usrProfile.jpeg";
  }

  asignarImagenLocalStorage()
  {
    //pendiente.
    return "/assets/img/usrProfile.jpeg";
  }

  cerrarSesion(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
