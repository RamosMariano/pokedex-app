import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FavoritesService } from '../../services/favorites.service'; 

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCardComponent {
  @Input() pokemon: any;

  constructor(private router: Router, private userService:UserService, private favouritesService:FavoritesService) {}
  
  verDetalle() {
    this.router.navigate(['/detail', this.pokemon.name]);
  }

  agregarFavorito() 
  {
    this.favouritesService.agregarPoke(this.pokemon);
  }

  eliminarDeFavoritos()
  {//lo dejo por aca por si es necesario
    this.favouritesService.eliminarFavorito(this.pokemon.name);
  }

  esFavoritoSN()
  {//por si llega a ser necesario para el icono del cora
    this.favouritesService.esFavoritoSN(this.pokemon.name);
  }

  logueado(): boolean {
    return this.userService.estaLogueado();
  }
}