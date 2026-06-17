import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FavoritesService } from '../../services/favorites.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCardComponent {
  @Output() clicBtn = new EventEmitter<void>();
  @Input() pokemon: any;

  constructor(private router: Router, private userService:UserService, private favouritesService:FavoritesService) {}
  
  verDetalle() {
    this.router.navigate(['/detail', this.pokemon.name]);
  }

  agregarFavorito() 
  {
    this.favouritesService.agregarPoke(this.pokemon);
    this.swANotificacion('s');
  }

  eliminarDeFavoritos()
  {
    this.favouritesService.eliminarFavorito(this.pokemon.name);
    this.swANotificacion('e');
    this.clicBtn.emit();
  }

  confirmarEliminarFavorito()
  {
    Swal.fire({ icon: 'warning', title: `¿Seguro que quieres eliminar a ${this.pokemon.name}?`, text: 'Este Pokémon será eliminado de tus favoritos',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e63946'
    }).then((result) =>
    {
      if (result.isConfirmed)
      {
        this.eliminarDeFavoritos();
      }
    });
  }

  esFavoritoSN()
  {
    return this.favouritesService.esFavoritoSN(this.pokemon.name);
  }

  logueado(): boolean {
    return this.userService.estaLogueado();
  }

  swANotificacion(opcion: string)
  {
    if(opcion === 's')
    {
      Swal.fire( `${this.pokemon.name} ahora es uno de tus favoritos!` ,'','success');
    }
    
    if(opcion === 'e')
    {
      Swal.fire( `${this.pokemon.name} fue removido de favoritos` ,'','success');
    }

  }

}