import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import {SpinnerComponent} from "../../components/spinner/spinner";
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, SpinnerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

  loading = true;
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) {}

   async ngOnInit() {
  this.loading = true;

  try {
    this.pokemons = await this.pokemonService.listaPokemon();
  } catch (e) {
    console.error(e);
  } finally {
    this.loading = false;
    this.cdr.detectChanges();
  }
}
}
