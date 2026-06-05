import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import {SpinnerComponent} from "../../components/spinner/spinner";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, SpinnerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

  loading = true;
  pokemons = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((data) => {
      this.pokemons = data.results;
      this.loading = false;
    });
}
