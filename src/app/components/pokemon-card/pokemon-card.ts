import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCardComponent {
  // Placeholder prueba de datos
  @Input() pokemon: any = {
  name: 'Pikachu',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  types: ['Electric']
};
  agregarFavorito() {
    console.log('Favorito agregado');
  }

}
