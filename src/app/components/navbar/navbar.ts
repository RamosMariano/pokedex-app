import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent 
{
  logueado = false; //para evitar mostrar otros links si no hay sesion
  profileImg = this.asignarImagenLocalStorage();

  selectorRuta() //te manda al login si no estas logueado.
  {
    if (this.logueado === true) 
    {
      return "/home";
    }

    return "/login";
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

}
