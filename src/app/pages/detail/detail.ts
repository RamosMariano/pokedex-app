import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})

export class DetailComponent {

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit() {

    await this.pokemonService.loadPokemon('pikachu');

  }
}
