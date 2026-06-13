import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss'
})
export class FavoritesComponent 
{
  constructor(private favouritesService:FavoritesService) {}

  pokeFavs: any = [];

  ngOnInit()
  {
    this.pokeFavs = this.favouritesService.obtenerPokeFavoritos();
  }

  refrescar() //esto es para que los que va eliminando user no aparezcan
  {
    this.pokeFavs = this.favouritesService.obtenerPokeFavoritos();
  }

}
