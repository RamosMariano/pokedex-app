import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCardComponent {
  @Input() pokemon: any;

  constructor(private router: Router) {}

  verDetalle() {
    this.router.navigate(['/detail', this.pokemon.name]);
  }

  agregarFavorito() {
    console.log('Favorito agregado');
  }
}